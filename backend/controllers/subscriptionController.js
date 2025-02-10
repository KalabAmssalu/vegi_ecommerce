import mongoose from "mongoose";
import { Chapa } from "chapa-nodejs";
import Subscription from "../models/subscription.js";

// Create Subscription Endpoint
export const createSubscription = async (req, res) => {
  const chapa = new Chapa({
    secretKey: process.env.CHAPA_SECRET_KEY,
  });

  try {
    const { name, email, phoneNumber, selectedPlan } = req.body;

    // Validate input
    if (!name || !email || !phoneNumber || !selectedPlan) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Generate a unique transaction reference
    const tx_ref = `TX-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Create a new subscription with tx_ref
    const subscription = new Subscription({
      name,
      email,
      phoneNumber,
      selectedPlan,
      status: "pending",
      tx_ref, // Assign tx_ref here
    });

    // Save subscription to the database
    const savedSubscription = await subscription.save();

    // Prepare Chapa payment data
    const paymentData = {
      first_name: name.split(" ")[0],
      last_name: name.split(" ")[1] || "",
      email: email,
      phone_number: "0911121314",
      currency: "ETB", // Default currency (can be changed)
      amount:
        selectedPlan === "basic"
          ? "9.99"
          : selectedPlan === "standard"
          ? "19.99"
          : "29.99",
      tx_ref: tx_ref, // Pass tx_ref in payment data
      callback_url: "http://localhost:5000/api/subscription/chapa/callback",
      return_url: "http://localhost:4000/subscription/success", // Redirect after payment
      customization: {
        title: "Test Title",
        description: "Test Description",
      },
    };

    // Initialize Chapa payment
    const response = await chapa.initialize(paymentData);

    // Return payment URL to the frontend
    res.json({
      checkoutUrl: response.data.checkout_url,
      email: email,
      name: name,
      amount: paymentData.amount,
      tx_ref: tx_ref, // Return the tx_ref
    });
  } catch (error) {
    console.error("Subscription creation error:", error);
    res.status(500).json({ error: "Subscription processing failed" });
  }
};

// Chapa Callback Endpoint
export const chapaCallback = async (req, res) => {
  try {
    const { tx_ref, status } = req.body;

    // Find the subscription by transaction reference
    const subscription = await Subscription.findOne({ tx_ref });

    if (!subscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    // Update subscription status based on Chapa callback
    subscription.status = status === "success" ? "active" : "failed";
    await subscription.save();

    res.status(200).send("Callback received");
  } catch (error) {
    console.error("Error handling Chapa callback:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Verify Payment Endpoint
export const verifyPayment = async (req, res) => {
  try {
    const { tx_ref } = req.params;

    // Verify payment with Chapa
    const response = await chapa.verify(tx_ref);

    // Find the subscription by transaction reference
    const subscription = await Subscription.findOne({ tx_ref });

    if (!subscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    // Update subscription status based on verification
    subscription.status =
      response.data.status === "success" ? "active" : "failed";
    await subscription.save();

    res.json(response.data);
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ error: "Payment verification failed" });
  }
};
