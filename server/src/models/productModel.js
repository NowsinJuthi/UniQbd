import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId, ref: "Category",
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    photo: { type: String },
    bgphoto: { type: String },
    discountPrice: {
      type: Number
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    packages: [
      {
        name: String,
        regularPrice: Number,
        discountPrice: Number,
        shortDesc: String,
        longDesc: String,
      },
    ],
    stockStatus: {
      type: String,
      enum: ["In Stock", "Out of Stock"],
      default: "In Stock",
    },
    averageRating: {
      type: Number,
      default: 0,
    },
  },


  { timestamps: true }
);

const productModel =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default productModel;
