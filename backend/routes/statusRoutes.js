import express from "express";

import auth from "../middleware/auth.js";

import { getAllStatus } from "../controllers/statusController.js";

const router = express.Router();

router.get("/dashboard", auth, getAllStatus);

export default router;
