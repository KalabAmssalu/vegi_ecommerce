import mongoose from "mongoose";
import Customer from "../models/customer.js";
import Order from "../models/order.js";
import axios from "axios";

import Payment from "../models/payment.js";
import { Chapa } from "chapa-nodejs";
import Product from "../models/product.js";
import Merchant from "../models/merchant.js";
// Create Payment Endpoint
export const createPayment = async (req, res) => {
  const chapa = new Chapa({
    secretKey: process.env.CHAPA_SECRET_KEY,
  });

  try {
    const {
      amount,
      currency,
      email,
      name,
      street,
      city,
      state,
      postalCode,
      country,
      paymentMethod,
      products,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.user.userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    // Find customer with population if needed
    const userId = req.user.userId;
    const buyerCustomer = await Customer.findOne({ user: userId });

    if (!buyerCustomer) {
      return res.status(404).json({ error: "Customer profile not found" });
    }

    const order = new Order({
      customer: buyerCustomer._id,
      products: products.map((product) => ({
        product: product.id,
        quantity: product.quantity,
        price: product.price,
      })),
      totalAmount: amount,
      status: "pending",
      delivery_address: {
        street,
        city,
        state,
        postal_code: postalCode,
        country,
        email,
      },
      payment_status: false, // Will update after payment
      orderDate: Date.now(),
    });

    const orderResponse = await order.save();
    console.log("order response", orderResponse);

    const updatedData = await Customer.findByIdAndUpdate(buyerCustomer._id, {
      orderHistory: [orderResponse._id],
    });

    console.log("updatedData customer data", updatedData);

    const tx_ref = `TX-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const paymentData = {
      first_name: "John",
      last_name: "Doe",
      email: email,
      phone_number: "0911121314",
      currency: currency || "ETB",
      amount: amount,
      tx_ref: tx_ref,
      callback_url: "http://localhost:4000/payment/failed",
      return_url: "http://localhost:4000/payment/success",
      customization: {
        title: "Test Title",
        description: "Test Description",
      },
    };

    // Create Chapa payment
    const response = await chapa.initialize(paymentData);

    // Save payment to DB
    await Payment.create({
      order: orderResponse._id,
      customer: buyerCustomer._id,
      amount,
      paymentMethod,
      paymentStatus: "pending",
      tx_ref,
      currency: paymentData.currency,
    });

    // Decrease product quantity in the inventory
    for (const product of products) {
      const productId = product.id;
      const quantityPurchased = product.quantity;

      // Find the product by ID
      const productToUpdate = await Product.findById(productId);

      if (productToUpdate) {
        // Decrease the product quantity
        const merchant = await Merchant.findById(productToUpdate.merchant);

        if (merchant) {
          // Add the order ID to the merchant's orders array
          merchant.orders.push(orderResponse._id);
          await merchant.save(); // Save the updated merchant
          console.log(`Updated merchant ${merchant._id} with new order`);
        } else {
          return res
            .status(404)
            .json({ error: "Merchant not found for product" });
        }

        if (productToUpdate.quantity >= quantityPurchased) {
          productToUpdate.quantity -= quantityPurchased;

          await productToUpdate.save(); // Save the updated product
          console.log(
            `Updated product ${productToUpdate.name} quantity to ${productToUpdate.quantity}`
          );
        } else {
          return res
            .status(400)
            .json({ error: `Insufficient stock for ${productToUpdate.name}` });
        }
      } else {
        return res.status(404).json({ error: "Product not found" });
      }
    }

    console.log("payment response", response);
    res.json({
      checkoutUrl: response.data.checkout_url,
      email: email,
      name: name,
      amount: amount,
      tx_ref: tx_ref,
    });
  } catch (error) {
    console.error("Payment creation error:", error);
    res.status(500).json({ error: "Payment processing failed" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    console.log("Verifying payment:", req.params.id);

    // Define Chapa API URL
    const url = `https://api.chapa.co/v1/transaction/verify/${req.params.id}`;

    // Send request to Chapa API
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
      },
    });

    console.log("Chapa Verification Response:", response.data);

    // Extract tx_ref from Chapa response
    const txRefFromChapa = response.data?.data?.tx_ref;

    if (!txRefFromChapa) {
      return res.status(400).json({ error: "Invalid Chapa response" });
    }

    // Find the payment in the database
    const payment = await Payment.findOne({ tx_ref: txRefFromChapa });

    if (!payment) {
      return res.status(404).json({ error: "Payment record not found" });
    }

    // Update payment status
    payment.paymentStatus = "paid";
    await payment.save();

    // Update order status
    await Order.findByIdAndUpdate(payment.order, {
      payment_status: true,
      status: "confirmed",
    });

    console.log(`Payment ${payment.tx_ref} marked as PAID`);

    res.json(response.data);
  } catch (error) {
    console.error("Payment verification error:", error.message);
    res.status(400).json({ error: error.message });
  }
};

// Update a payment
export const updatePayment = async (req, res) => {
  const {
    order,
    customer,
    amount,
    paymentMethod,
    paymentStatus,
    transactionId,
    paymentDate,
    assignedOrder,
  } = req.body;

  try {
    const updatedPayment = await Payment.findByIdAndUpdate(
      req.params.id,
      {
        order,
        customer,
        amount,
        paymentMethod,
        paymentStatus,
        transactionId,
        paymentDate,
        assignedOrder,
      },
      { new: true, runValidators: true }
    )
      .populate("order")
      .populate("customer")
      .populate("assignedOrder");

    if (!updatedPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json(updatedPayment);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: "Error updating payment" });
  }
};

// Delete a payment
export const deletePayment = async (req, res) => {
  try {
    const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
    if (!deletedPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error deleting payment" });
  }
};

// Get all payments
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("order")
      .populate("customer");
    res.status(200).json(payments);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching payments" });
  }
};

// Get a payment by ID
export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("order")
      .populate("customer");
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json(payment);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching payment" });
  }
};
