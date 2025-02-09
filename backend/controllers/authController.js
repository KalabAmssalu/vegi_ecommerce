import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";
import Merchant from "../models/Merchant.js";
import Customer from "../models/Customer.js";
import DeliveryPerson from "../models/deliveryPerson.js";

// Login user

export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      msg: "Validation failed",
      errors: errors.array(),
    });
  }

  const { email, password, role } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "Invalid credentials. No user found with the provided email.",
      });
    }

    let userStatus;

    // Role-based status checks
    if (role === "merchant") {
      userStatus = await Merchant.findOne({ user: user._id });
      if (!userStatus) {
        return res.status(404).json({ message: "Merchant not found" });
      }
      if (!userStatus.isVerified) {
        return res.status(403).json({ message: "Merchant is not verified" });
      }
    } else if (role === "customer") {
      userStatus = await Customer.findOne({ user: user._id });
      if (!userStatus) {
        return res.status(404).json({ message: "Customer not found" });
      }
      if (userStatus.isBlocked) {
        return res.status(403).json({ message: "Customer account is blocked" });
      }
    } else if (role === "delivery") {
      userStatus = await DeliveryPerson.findOne({ user: user._id });
      if (!userStatus) {
        return res.status(404).json({ message: "Delivery user not found" });
      }
      if (userStatus.isBlocked) {
        return res.status(403).json({ message: "Delivery account is blocked" });
      }
    } else {
      return res.status(400).json({ message: "Invalid user role" });
    }

    // Compare provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        msg: "Invalid credentials. Incorrect password.",
      });
    }

    // Check if the user's role matches the provided role
    if (user.role !== role) {
      return res.status(403).json({
        msg: "Access denied. Your role does not have permission to log in.",
      });
    }

    // Generate the JWT token
    const token = generateToken(res, user);
    console.log("Generated Token:", token);

    // Respond with user data (excluding password) and token
    res.status(200).json({
      msg: "Login successful",
      data: {
        id: user.id,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        token,
      },
    });
  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(500).json({
      msg: "Internal server error. Please try again later.",
      error: err.message,
    });
  }
};

// Get a user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  try {
    const { role, firstName, lastName, email, password, phoneNumber, address } =
      req.body;

    // Hash the password if it is being updated
    const updatedData = {
      role,
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
    };
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: error.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};
