import express from "express";
import {
  createDeliveryPerson,
  getAllDeliveryPersons,
  getDeliveryPersonById,
  updateDeliveryPerson,
  deleteDeliveryPerson,
  blockDeliveryPerson,
} from "../controllers/deliveryPersonController.js";
import auth from "../middleware/auth.js";
import authorize from "../middleware/authorization.js";

const router = express.Router();

// Create a new delivery person (Admin and Manager only)
router.post(
  "/",
  auth, // Authenticate the user
  authorize("deliverypeople", "WRITE"), // Authorize based on the user's role
  createDeliveryPerson
);

router.get(
  "/",
  auth, // Authenticate the user
  authorize("deliverypeople", "READ"), // Authorize based on the user's role
  getAllDeliveryPersons
);

router.put(
  "/block/:id",
  auth, // Authenticate the user
  authorize("deliverypeople", "WRITE"), // Authorize based on the user's role
  blockDeliveryPerson
);
// Get a delivery person by ID (Admin, Manager, or the DeliveryPerson themselves)
router.get(
  "/:id",
  auth, // Authenticate the user
  authorize("deliverypeople", "READ"), // Authorize based on the user's role
  getDeliveryPersonById
);

// Update a delivery person by ID (Admin, Manager, or the DeliveryPerson themselves)
router.put(
  "/:id",
  auth, // Authenticate the user
  authorize("deliverypeople", "WRITE"), // Authorize based on the user's role
  updateDeliveryPerson
);

// Delete a delivery person by ID (Admin only)
router.delete(
  "/:id",
  auth, // Authenticate the user
  authorize("deliverypeople", "DELETE"), // Only Admins can delete delivery persons
  deleteDeliveryPerson
);

export default router;
