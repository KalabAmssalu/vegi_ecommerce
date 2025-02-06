import mongoose from "mongoose";
import Customer from "../models/customer.js";
import Order from "../models/order.js";
import Payment from "../models/payment.js";
import { Chapa } from "chapa-nodejs";
import e from "express";
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
      callback_url: "https://example.com/",
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

// Verify Payment Endpoint
export const verifyPayment = async (req, res) => {
  const chapa = new Chapa(process.env.CHAPA_SECRET_KEY);
  try {
    const verification = await chapa.verify(req.params.tx_ref);

    // Update payment status
    await Payment.findOneAndUpdate(
      { tx_ref: req.params.tx_ref },
      { status: verification.status }
    );

    res.json(verification);
  } catch (error) {
    res.status(400).json({ error: "Verification failed" });
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
