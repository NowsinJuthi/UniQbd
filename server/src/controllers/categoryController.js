import slugify from "slugify";
import CategoryModel from "../models/categoryModel.js";


export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await CategoryModel
    .findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category already exists",
        category: existingCategory,
      });
    }
    console.log("Saving category:", name);

    const category = await new CategoryModel({
      name,
      slug: slugify(name),
    }).save();
    console.log("Saved category:", category);

    res.status(201).send({
      success: true,
      message: "New Category created",
      category: category,
    });
  } catch (error) {
    console.log("CreateCategory Error:", error);
    res.status(500).send({ success: false, message: "Server Error", error });
  }
};

export const categoryController = async (req, res) => {
  try {
    const category = await CategoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All Categories List",
      category,
    });
  } catch (error) {
    console.log("GetCategories Error:", error);
    res.status(500).send({ success: false, message: "Server Error", error });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Server Error", error });
  }
};

export const simpleCategoryController = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    res
      .status(200)
      .send({ success: true, message: "Category Details", category });
  } catch (error) {
    res.status(500).send({ success: false, message: "Server Error", error });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await CategoryModel.findByIdAndDelete(id);
    res.status(200).send({ success: true, message: "Category Details" });
  } catch (error) {
    res.status(500).send({ success: false, message: "Server Error", error });
  }
};
