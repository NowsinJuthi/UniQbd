import ReviewModel from "../models/ReviewModel.js";
import RatingModel from "../models/RatingModel.js";
import productModel from "../models/productModel.js";

// ✅ Add Review + Rating Together
export const addReviewAndRating = async (req, res) => {
  try {
    const { productId, review, rating } = req.body;
    const userId = req.user._id;

    if (!productId || !review || !rating) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // 1️⃣ Update or create rating
    let existingRating = await RatingModel.findOne({
      user: userId,
      product: productId,
    });

    if (existingRating) {
      existingRating.rating = rating;
      await existingRating.save();
    } else {
      await new RatingModel({
        user: userId,
        product: productId,
        rating,
      }).save();
    }

    // 2️⃣ Save review (with rating)
    await new ReviewModel({
      user: userId,
      product: productId,
      review,
      rating,
    }).save();

    // 3️⃣ Update product average rating
    const allRatings = await RatingModel.find({ product: productId });
    const avg =
      allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length;

    await productModel.findByIdAndUpdate(productId, {
      averageRating: avg.toFixed(1),
    });

    res.status(201).json({
      success: true,
      message: "Review & rating submitted successfully",
      averageRating: avg.toFixed(1),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ✅ Get Reviews by Product
export const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await ReviewModel.find({ product: productId })
      .populate("user", "name email")
      .populate("product", "name slug")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ✅ Admin: Get All Reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await ReviewModel.find()
      .populate("user", "name email")
      .populate("product", "name slug")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ✅ Admin: Delete Review
export const deleteReview = async (req, res) => {
  try {
    await ReviewModel.findByIdAndDelete(req.params.reviewId);
    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// ✅ Admin: Approve Review
export const approveReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await ReviewModel.findByIdAndUpdate(
      reviewId,
      { status: "approved" },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    res.status(200).json({
      success: true,
      message: "Review approved successfully",
      review,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ✅ Admin: Edit Review
export const editReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { review } = req.body;

    if (!review || !review.trim()) {
      return res.status(400).json({ success: false, message: "Review text required" });
    }

    const updatedReview = await ReviewModel.findByIdAndUpdate(
      reviewId,
      { review },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      updatedReview,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
