import Manager from "../models/manager.js";
import AdminUser from "../models/adminUser.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";

// Create Manager
export const createManager = async (req, res) => {
  try {
    // Validate request input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { role, firstName, lastName, email, password, phoneNumber, address } =
      req.body;

    // Check if the user exists
    let adminUser = await AdminUser.findOne({ email });
    if (adminUser) {
      return res.status(404).json({ msg: "Manager already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new User
    adminUser = new AdminUser({
      role,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    });

    // Save the User
    await adminUser.save();

    // Create a new Manager
    const manager = new Manager({
      user: adminUser._id,
    });

    // Save the Manager
    await manager.save();

    res.status(201).json({ msg: "Manager created successfully", manager });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Get all Managers
export const getAllManagers = async (req, res) => {
  try {
    const managers = await Manager.find().populate("user");
    res.status(200).json(managers);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching managers" });
  }
};

// Get Manager by ID
export const getManagerById = async (req, res) => {
  try {
    const manager = await Manager.findById(req.params.id).populate("user");
    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }
    res.status(200).json(manager);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching manager" });
  }
};


export const updateManager = async (req, res) => {
  const {
    isBlocked,
    role,
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    address,
  } = req.body;

  try {
    const manager = await Manager.findById(req.params.id).populate("user");

    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }

    // Update the manager's `isBlocked` status
    manager.isBlocked = isBlocked;

    // Update the associated `AdminUser` fields
    if (manager.user) {
      await AdminUser.findByIdAndUpdate(
        manager.user._id,
        { role, firstName, lastName, email, password, phoneNumber, address },
        { new: true, runValidators: true }
      );
    }

    await manager.save();

    res.status(200).json({ message: "Manager updated successfully", manager });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: "Error updating manager" });
  }
};

// Delete Manager
export const deleteManager = async (req, res) => {
  try {
    const deletedManager = await Manager.findByIdAndDelete(req.params.id);
    if (!deletedManager) {
      return res.status(404).json({ message: "Manager not found" });
    }
    res.status(200).json({ message: "Manager deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error deleting manager" });
  }
};
