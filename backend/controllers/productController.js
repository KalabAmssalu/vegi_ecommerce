import Product from "../models/product.js";

// Create a new product
import path from "path";

import Merchant from "../models/merchant.js";
import { validationResult } from "express-validator";
import { console } from "inspector";

// Create Product Controller

export const createProduct = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Validate request input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure request body
    const { name, description, price, quantity, category } = req.body;

    const merchant = await Merchant.findOne({ user: userId });

    // Check if the merchant exists
    const existingMerchant = await Merchant.findById(merchant);
    if (!existingMerchant) {
      return res.status(404).json({ msg: "Merchant not found" });
    }

    // Handle file upload
    const imageFile = req.file;
    if (!imageFile) {
      return res.status(400).json({ msg: "Image file is required" });
    }

    // Set the image URL
    const imageUrl = path.posix.join("uploads", imageFile.filename);

    // Create a new Product
    const product = new Product({
      merchant,
      name,
      description,
      category,
      price,
      quantity,
      imageUrl, // This now stores the single image URL
    });

    // Save the Product
    await product.save();

    // Update the Merchant's products array
    existingMerchant.products.push(product._id);
    await existingMerchant.save();

    // Respond with success
    res.status(201).json({ msg: "Product created successfully", product });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

export const createProductFromMerchant = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Validate request input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure request body
    const { name, description, price, quantity, category } = req.body;
    console.log("category", category);
    

    // Handle file upload
    const imageFile = req.file;
    if (!imageFile) {
      return res.status(400).json({ msg: "Image file is required" });
    }

    // Set the image URL
    const imageUrl = path.posix.join("uploads", imageFile.filename);

    // Create a new Product
    const product = new Product({
      merchant: userId,
      name,
      description,
      category,
      price,
      quantity,
      imageUrl, // This now stores the single image URL
    });
    console.log("product", product);
    // Save the Product
    await product.save();

    res.status(201).json({ msg: "Product created successfully", product });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Get all products
export const getMyProduct = async (req, res) => {
  try {
    const userId = req.user.userId;
    const merchant = await Merchant.findOne({ user: userId });

    // Check if the merchant exists
    const existingMerchant = await Merchant.findById(merchant);
    if (!existingMerchant) {
      return res.status(404).json({ msg: "Merchant not found" });
    }
    const products = await Product.find({ merchant: merchant })
      .populate("merchant")
      .populate("category");
    res.status(200).json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching products" });
  }
};
// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("merchant")
      .populate("category");
    res.status(200).json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching products" });
  }
};

// Get a product by ID
export const getMyProductsById = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find the merchant linked to the user
    const merchant = await Merchant.findOne({ user: userId });

    if (!merchant) {
      return res.status(404).json({ msg: "Merchant not found" });
    }

    // Find the specific product by ID, ensuring it belongs to the merchant
    const product = await Product.findOne({
      _id: req.params.id,
      merchant: merchant._id,
    })
      .populate("merchant")
      .populate("category");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching product" });
  }
};

// Get a product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("merchant")
      .populate("category");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching product" });
  }
};

// Update Product Controller
export const updateProduct = async (req, res) => {
  const { name, description, category, price, quantity, imageUrl, isActive } =
    req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, category, price, quantity, imageUrl, isActive },
      { new: true, runValidators: true }
    )
      .populate("merchant")
      .populate("category");

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: "Error updating product" });
  }
};

export const upadateOnlyFields = async (req, res) => {
  const { id } = req.params; // Product ID from the URL
  const updatedFields = req.body; // The updated fields from the request body

  try {
    // Check if the product exists
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update only the fields that are provided in the request body
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: updatedFields }, // Only set the fields that are provided in updatedFields
      { new: true, runValidators: true } // `new: true` returns the updated product, `runValidators: true` ensures schema validation
    );

    // Respond with the updated product
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error deleting product" });
  }
};
