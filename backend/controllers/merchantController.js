import User from "../models/user.js";
import bcrypt from "bcryptjs"; // For hashing passwords
import path from "path"; // For handling file paths
import Order from "../models/order.js";
import Merchant from "../models/merchant.js";

// Register a new Merchant
export const createMerchant = async (req, res) => {
  try {
    // Validate request input
    console.log("Merchant SignUp", req.body);

    // Handle file upload
    const trade_permit = req.file;
    if (!trade_permit) {
      return res.status(400).json({ msg: "Trade permit file is required" });
    }
    //111
    // Set the image URL
    const tradePermitPath = path.join("uploads", trade_permit.filename);

    // Destructure request body
    const { role, firstName, lastName, email, password, phoneNumber, address } =
      req.body;

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new User
    user = new User({
      role,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    });

    // Save the User
    await user.save();

    // Create a new Merchant
    const merchant = new Merchant({
      trade_permit: tradePermitPath,
      address: address,
      user: user._id,
    });

    // Save the Merchant
    await merchant.save();

    // Respond with success
    res.status(201).json({ msg: "Merchant registered successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Get all merchants
export const getAllMerchants = async (req, res) => {
  try {
    const merchants = await Merchant.find()
      .populate("user")
      .populate("products");
    res.status(200).json(merchants);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching merchants" });
  }
};

export const toggleVerified = async (req, res) => {
  try {
    const merchant = await Merchant.findById(req.params.id);
    if (!merchant) {
      return res.status(404).json({ message: "Merchant not found" });
    }

    // Toggle the isVerified status
    merchant.isVerified = !merchant.isVerified;
    await merchant.save();

    res.status(200).json({
      message: `Merchant verification status updated to ${merchant.isVerified}`,
      isVerified: merchant.isVerified,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error toggling merchant verification" });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find the merchant by the user ID
    const merchant = await Merchant.findOne({ user: userId });
    if (!merchant) {
      return res.status(404).json({ msg: "Merchant not found" });
    }

    // Fetch all orders that contain at least one product sold by the merchant
    const orders = await Order.find({
      "products.product": { $in: merchant.products },
    })
      .populate("customer") // Populate customer details
      .populate("products.product") // Populate product details
      .populate("deliveryPerson"); // Populate delivery person details

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    // Filter the products inside each order to include only the merchant's products
    const filteredOrders = orders
      .map((order) => {
        const filteredProducts = order.products.filter(
          (item) =>
            item.product &&
            merchant.products.some((merchantProductId) =>
              merchantProductId.equals(item.product._id)
            )
        );

        return {
          _id: order._id,
          customer: order.customer,
          products: filteredProducts,
          totalAmount: filteredProducts.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          ), // Calculate total for this merchant
          status: order.status,
          deliveryPerson: order.deliveryPerson,
          delivery_address: order.delivery_address,
          orderDate: order.orderDate,
          payment_status: order.payment_status,
          deliveryDate: order.deliveryDate,
        };
      })
      .filter((order) => order.products.length > 0); // Remove orders with no relevant products

    return res.status(200).json(filteredOrders);
  } catch (error) {
    console.error(error.message);

    if (error.name === "CastError") {
      return res.status(400).json({ msg: "Invalid order or merchant ID" });
    }

    return res.status(500).json({ msg: "Server Error" });
  }
};

// Get a merchant by ID
export const getMerchantById = async (req, res) => {
  try {
    const merchant = await Merchant.findById(req.params.id)
      .populate("user")
      .populate("products");
    if (!merchant) {
      return res.status(404).json({ message: "Merchant not found" });
    }
    res.status(200).json(merchant);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching merchant" });
  }
};

// Update a merchant
export const updateMerchant = async (req, res) => {
  try {
    const { isVerified, isBlocked, products } = req.body;

    // Handle file upload for trade_permit update
    let trade_permit = req.body.trade_permit;
    if (req.file) {
      trade_permit = path.join("uploads", req.file.filename);
    }

    const updatedMerchant = await Merchant.findByIdAndUpdate(
      req.params.id,
      { trade_permit, isVerified, isBlocked, products },
      { new: true, runValidators: true }
    )
      .populate("user")
      .populate("products");

    if (!updatedMerchant) {
      return res.status(404).json({ message: "Merchant not found" });
    }

    res.status(200).json(updatedMerchant);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: "Error updating merchant" });
  }
};

// Delete a merchant
export const deleteMerchant = async (req, res) => {
  try {
    const deletedMerchant = await Merchant.findByIdAndDelete(req.params.id);
    if (!deletedMerchant) {
      return res.status(404).json({ message: "Merchant not found" });
    }
    res.status(200).json({ message: "Merchant deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error deleting merchant" });
  }
};
