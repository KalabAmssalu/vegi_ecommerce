import express from "express";
import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  deactivateCustomer,
} from "../controllers/customerController.js"; // Adjust the path as necessary
import auth from "../middleware/auth.js";
import authorize from "../middleware/authorization.js";

const router = express.Router();

// Create a new customer (Publicly accessible)
router.post("/", createCustomer);

// Get all customers (Admin and Manager only)
router.get("/", auth, authorize("customers", "READ"), getAllCustomers);

// Get a customer by ID (Admin, Manager, Merchant, DeliveryPerson, or the Customer themselves)
router.get("/:id", auth, authorize("customers", "READ"), getCustomerById);

// Update a customer by ID (Admin, Manager, or the Customer themselves)
router.put(
  "/:id",
  auth, // Authenticate the user
  authorize("customers", "WRITE"),
  updateCustomer
);

router.put("/deactivate/:id", auth, authorize("customers", "WRITE"), deactivateCustomer);

// Delete a customer by ID (Admin and Manager only)
router.delete("/:id", auth, authorize("customers", "DELETE"), deleteCustomer);

export default router;
