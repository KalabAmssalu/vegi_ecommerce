import Merchant from "../models/Merchant.js";
import Customer from "../models/Customer.js";
import DeliveryPerson from "../models/deliveryPerson.js";

const checkUserStatus = async (req, res, next) => {
  try {
    const { role, userId } = req.user;

    if (!userId) {
      return res.status(400).json({ message: "User ID is missing" });
    }

    let userStatus;

    if (role === "merchant") {
      userStatus = await Merchant.findOne({ user: userId });
      if (!userStatus) {
        return res.status(404).json({ message: "Merchant not found" });
      }
      if (!userStatus.isVerified) {
        return res.status(403).json({ message: "Merchant is not verified" });
      }
    } else if (role === "customer") {
      userStatus = await Customer.findOne({ user: userId });
      if (!userStatus) {
        return res.status(404).json({ message: "Customer not found" });
      }
      if (userStatus.isBlocked) {
        return res.status(403).json({ message: "Customer account is blocked" });
      }
    } else if (role === "delivery") {
      userStatus = await DeliveryPerson.findOne({ user: userId });
      if (!userStatus) {
        return res.status(404).json({ message: "Delivery user not found" });
      }
      if (userStatus.isBlocked) {
        return res.status(403).json({ message: "Delivery account is blocked" });
      }
    } else {
      return res.status(400).json({ message: "Invalid user role" });
    }

    return next(); // Proceed if all checks pass
  } catch (error) {
    console.error("Error checking user status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default checkUserStatus;
