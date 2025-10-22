import { generatedToken } from "../config/jwtProvider.js";
import paymentModel from "../models/paymentModel.js";
import userModel from "../models/userModel.js";
import { createUser, getUserByEmail } from "../services/userService.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    console.log("Registration body:", req.body);
    const user = await createUser(req.body);
    const jwt = generatedToken(user._id);

    return res.status(201).json({ jwt, message: "Register Successful" });
  } catch (error) {
    console.error("Error in register:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};
export const login = async (req, res) => {
  const { password, email } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found with email:", email });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid Password" });
    }

    const jwt = generatedToken(user._id);
    return res.status(200).send({
      jwt,
      message: "Login Success",
      role: user.role,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    console.log("Incoming Data:", { email, newPassword });

    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!newPassword)
      return res.status(400).json({ message: "New Password is required" });

    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "Wrong Email" });

    const hashed = await bcrypt.hash(newPassword, 10);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });

    res.status(200).json({ message: "Password Reset Successfully" });
  } catch (error) {
    console.error("Error in forgotPasswordController:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

export const allOrdersController = async (req, res) => {
  try {
    const orders = await paymentModel
      .find()
      .populate("orderItems.productId", "-photo")
       .populate("noteSelector", "name")
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error in allOrdersController:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, note, noteSelector } = req.body;

    // Update order and return updated document
    const order = await paymentModel
      .findByIdAndUpdate(
        orderId,
        { status, note, noteSelector },
        { new: true } // return the updated document
      )
      .populate("noteSelector", "name") // populate selected note
      .populate("userId", "name email"); // optional: populate user info

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    console.error("Error in orderStatusController:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
};

export const deletePaymentController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const deletedOrder = await paymentModel.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("Error in deletePaymentController:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
