import express from "express";
import {
  createSubscription,
  chapaCallback,
  verifyPayment,
} from "../controllers/subscriptionController.js";

const router = express.Router();

router.post("/subscribe", createSubscription);
router.post("/subscription/chapa/callback", chapaCallback);
router.get("/subscription/verify/:tx_ref", verifyPayment);

export default router;
