import mongoose from "mongoose";
import paymentModel from "../models/paymentModel.js";
import userModel from "../models/userModel.js";
import { generateOrderNumber } from "../utils/generateOrderNumber.js";
import sendOrderEmail from "../utils/sendOrderEmail.js";


// ✅ Create new payment order
export const createPayment = async (req, res) => {
  try {

    if (!req.user?._id) {
      return res.status(401).json({ error: "User not found in token" });
    }

    const {
      paymentMethod,
      accountNumber,
      transactionId,
      amount,
      orderItems,
      playerId,
      address
    } = req.body;

    for (const item of orderItems) {
      if (!mongoose.Types.ObjectId.isValid(item.productId)) {
        return res.status(400).json({
          error: `Invalid product ID: ${item.productId}`,
        });
      }
    }
    // ✅ Validate required fields
    if (
      !paymentMethod ||
      !accountNumber ||
      !transactionId ||
      !amount ||
      !orderItems?.length
    ) {
      return res.status(400).json({ error: "All payment fields are required" });
    }

    // ✅ Check if transactionId is unique
    const existing = await paymentModel.findOne({ transactionId });
    if (existing) {
      return res.status(400).json({ error: "Transaction ID already used" });
    }

    // ✅ Validate orderItems
    for (const item of orderItems) {
      if (!mongoose.Types.ObjectId.isValid(item.productId)) {
        return res
          .status(400)
          .json({ error: `Invalid product ID: ${item.productId}` });
      }
    }

    // ✅ Create payment
    const payment = await paymentModel.create({
      orderNumber: await generateOrderNumber(),

      userId: req.user._id,
      paymentMethod,
      accountNumber,
      transactionId,
      amount,
      orderItems: orderItems.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        playerId: item.playerId || null,
      })),
      address,
    });


    // ✅ ইউজার ডিটেইলস পাওয়া
    const user = await userModel.findById(req.user._id);

    // ✅ ইমেইল পাঠানো
    await sendOrderEmail(user.email, {
      _id: payment._id,
      userName: user.name,
      productName: "Gaming Item / Top-Up",
      amount,
      paymentMethod,
      transactionId,
    });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully and email sent",
      payment,
    });
  } catch (error) {
    console.error("Payment creation error:", error);
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Get all payments (admin use)
export const getAllPayments = async (req, res) => {
  try {
    const payments = await paymentModel
      .find()
      .populate("orderItems.productId", "name price");
    return res.status(200).json({ success: true, payments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Get single payment by ID

export const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the payment and populate user info and selected note
    const payment = await paymentModel
      .findById(id)
      .populate("userId", "name email")       // populate user
      .populate("noteSelector", "name")       // populate selected note
      .populate("address"); // populate address

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    return res.status(200).json({ success: true, payment });
  } catch (error) {
    console.error("Error in getPaymentById:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
;

// ✅ Get payments for the logged-in user
export const getUserPayments = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ error: "User not found in token" });
    }

    const payments = await paymentModel
      .find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .populate("userId", "name email");

    return res.status(200).json({ success: true, payments });
  } catch (error) {
    console.error("Get user payments error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};





