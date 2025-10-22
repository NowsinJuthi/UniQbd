import mongoose, { mongo } from "mongoose";

const model = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

const CategoryModel = mongoose.model("Category", model);

export default CategoryModel;
