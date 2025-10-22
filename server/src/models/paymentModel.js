import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    orderItems: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        quantity: Number,
        playerId: Number,
      },
    ],
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    orderNumber: {
      type: String,
      unique: true,
    },
    note: {
      type: String,
    },
    noteSelector: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
     address: {
      userName: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      mobileNumber: {
        type: Number,
        required: true,
      },
      email: String,
      note: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
