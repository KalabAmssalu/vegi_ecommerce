import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getMyOrderById,
  getRecentOrders,
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

router.delete("/:id", auth, authorize("orders", "DELETE"), deleteOrder);

export default router;
