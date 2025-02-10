import express from "express";
import {
  createManager,
  getAllManagers,
  getManagerById,
  updateManager,
  deleteManager,
} from "../controllers/managerController.js";
import auth from "../middleware/auth.js";
import authorize from "../middleware/authorization.js";

const router = express.Router();

// Create a new manager (Admin only)
router.post(
  "/",
  auth, // Authenticate the user
  authorize("managers", "WRITE"), // Only Admins can create managers
  createManager
);

// Get all managers (Admin only)
router.get(
  "/",
  auth, // Authenticate the user
  authorize("managers", "READ"), // Only Admins can view all managers
  getAllManagers
);

// Get a manager by ID (Admin or the Manager themselves)
router.get(
  "/:id",
  auth, // Authenticate the user
  authorize("managers", "READ"),
  getManagerById
);

// Update a manager by ID (Admin or the Manager themselves)
router.put(
  "/:id",
  auth, // Authenticate the user
  authorize("managers", "WRITE"),
  updateManager
);

// Delete a manager by ID (Admin only)
router.delete(
  "/:id",
  auth, // Authenticate the user
  authorize("managers", "DELETE"), // Only Admins can delete managers
  deleteManager
);

export default router;
