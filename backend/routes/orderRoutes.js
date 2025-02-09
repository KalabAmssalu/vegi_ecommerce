import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getMyOrderById,
  getRecentOrders,
  SetDeliveryOrder,
} from "../controllers/orderController.js"; // Adjust the path as necessary
import auth from "../middleware/auth.js";
import authorize from "../middleware/authorization.js";

const router = express.Router();

router.get("/recent", auth, getRecentOrders);
router.post("/", auth, authorize("orders", "WRITE"), createOrder);

router.get("/myorder", auth, authorize("orders", "READ"), getMyOrderById);

router.get("/:id", auth, authorize("orders", "READ"), getOrderById);

router.get("/", auth, authorize("orders", "READ"), getAllOrders);

router.put("/:id", auth, authorize("orders", "WRITE"), updateOrder);

// PATCH route to update only the deliveryPerson of an order
router.patch(
  "/delivery/:id",
  auth,
  authorize("orders", "WRITE"),
  SetDeliveryOrder
);

router.delete("/:id", auth, authorize("orders", "DELETE"), deleteOrder);

export default router;
