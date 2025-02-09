import Order from "../models/order.js";
import Payment from "../models/payment.js";
import Product from "../models/product.js";
import User from "../models/user.js"; // Import User model
import mongoose from "mongoose";

export const getAllStatus = async (req, res) => {
  try {
    // Get the total number of products
    const totalProducts = await Product.countDocuments();

    // Get the total number of orders
    const totalOrders = await Order.countDocuments();

    // Get the total number of users
    const totalUsers = await User.countDocuments();

    // Get the number of delivered orders
    const deliveredOrders = await Order.countDocuments({ status: "delivered" });

    // Get the total sales amount from payments where status is 'paid' (for all time)
    const totalSales = await Payment.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]);

    // Get the total sales for the current month
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );
    const endOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    );

    const monthlySales = await Payment.aggregate([
      {
        $match: {
          paymentStatus: "paid",
          createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]);

    res.status(200).json({
      totalProducts,
      totalOrders,
      totalUsers,
      deliveredOrders,
      totalSales: totalSales.length > 0 ? totalSales[0].totalAmount : 0,
      monthlySales: monthlySales.length > 0 ? monthlySales[0].totalAmount : 0,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};
