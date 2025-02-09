import express from "express";
import {
  addFAQ,
  bulkDeleteFAQs,
  bulkUploadFAQs,
  getFAQ,
  handleChat,
} from "../controllers/chatController.js";

const router = express.Router();

router.post("/", handleChat);

router.post("/add", addFAQ);

router.post("/bulk", bulkUploadFAQs);

router.delete("/bulk", bulkDeleteFAQs);

router.get("/", getFAQ);

export default router;
