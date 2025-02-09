import express from "express";
import {
  createAdminUser,
  getAllAdminUsers,
  getAdminUserById,
  updateAdminUser,
  deleteAdminUser,
  loginUser,
} from "../controllers/adminUserController.js";
import auth from "../middleware/auth.js";
import authorize from "../middleware/authorization.js";

const router = express.Router();

router.post("/login", loginUser);
// Create a new admin user (Admin only)
router.post("/", createAdminUser);

// Get all admin users (Admin only)
router.get(
  "/",
  auth, // Authenticate the user
  authorize("admin", "READ"),
  getAllAdminUsers
);

// Get an admin user by ID (Admin only)
router.get(
  "/:id",
  auth, // Authenticate the user
  authorize("admin", "READ"),
  getAdminUserById
);

// Update an admin user by ID (Admin only)
router.put(
  "/:id",
  auth, // Authenticate the user
  authorize("admin", "WRITE"), // Only Admins can update admin users
  updateAdminUser
);

// Delete an admin user by ID (Admin only)
router.delete(
  "/:id",
  auth, // Authenticate the user
  authorize("admin", "DELETE"), // Only Admins can update admin users
  deleteAdminUser
);

export default router;
