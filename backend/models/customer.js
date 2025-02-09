import mongoose from "mongoose";
const Schema = mongoose.Schema;
const customerSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    orderHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate model compilation
const Customer =
  mongoose.models.Customer || mongoose.model("Customer", customerSchema);

export default Customer;
