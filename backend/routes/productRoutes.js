import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getMyProduct,
  getMyProductsById,
  createProductFromMerchant,
} from "../controllers/productController.js"; // Adjust the path as necessary
import upload from "../config/multerconfig.js";
import auth from "../middleware/auth.js";
import authorize from "../middleware/authorization.js"; // Changed the import to match previous examples

const router = express.Router();

// Create a new product (Merchant only)
router.post(
  "/",
  auth, // First authenticate the user
  authorize("products", "WRITE"),
  upload.single("imageUrl"),
  createProduct
);

router.post(
  "/create",
  auth, // First authenticate the user
  authorize("products", "WRITE"),
  upload.single("imageUrl"),
  createProductFromMerchant
);

router.get("/", auth, getAllProducts);

router.get(
  "/myproducts/:id",
  auth,
  authorize("products", "READ"),
  getMyProductsById
);

router.get("/myproducts", auth, authorize("products", "READ"), getMyProduct);

// Get all products (Customer, Merchant, Manager, Admin)
router.get(
  "/",
  auth, // First authenticate the user
  (req, res, next) =>
    authorize(req.user.role, "products", "READ")(req, res, next),
  getAllProducts
);

// Get a product by ID (Anyone can view products, including unauthenticated users)
router.get(
  "/:id",
  auth, // First authenticate the user
  authorize("products", "READ"),
  getProductById
);

// Update a product by ID (Merchant only)
router.put(
  "/:id",
  auth, // First authenticate the user
  (req, res, next) =>
    authorize(req.user.role, "products", "WRITE")(req, res, next),
  updateProduct
);

// Delete a product by ID (Merchant only)
router.delete(
  "/:id",
  auth, // First authenticate the user
  authorize("products", "DELETE"),
  deleteProduct
);

export default router;
