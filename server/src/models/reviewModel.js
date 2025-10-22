import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true, 
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
    status: { type: String, enum: ["pending", "approved"], default: "pending" },

});

const ReviewModel = mongoose.model("reviews", reviewSchema);
export default ReviewModel;
