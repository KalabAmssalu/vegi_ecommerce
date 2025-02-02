import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import auth from "../middleware/auth.js";
import authorize from "../middleware/authorization.js";

const router = express.Router();

// Create a new category (Admin or Manager only)
router.post(
  "/",
  auth, // First authenticate the user
  authorize("categories", "WRITE"),
  createCategory
);

// Get all categories (Anyone can access, including unauthenticated users)
router.get("/", auth, authorize("categories", "READ"), getAllCategories);

// Get a category by ID (Anyone can access, including unauthenticated users)
router.get("/:id", auth, authorize("categories", "READ"), getCategoryById);

// Update a category by ID (Admin or Manager only)
router.put("/:id", auth, authorize("categories", "WRITE"), updateCategory);

// Delete a category by ID (Admin or Manager only)
router.delete(
  "/:id",
  auth, // First authenticate the user
  authorize("categories", "DELETE"),
  deleteCategory
);

export default router;
