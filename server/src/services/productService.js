import CategoryModel from "../models/catagoryModel.js";
import mongoose from "mongoose";
const objectId = mongoose.Types.ObjectId;

export const CategoryListService = async () => {
  try {
    let data = await CategoryModel.find();
    return { status: "Success", data };
  } catch (error) {
    return { status: "Failed", data: error };
  }
};
export const SliderListService = async () => {
    try {
    let data = await CategoryModel.find();
    return { status: "Success", data };
  } catch (error) {
    return { status: "Failed", data: error };
  }

};
export const ListByCategoryService = async () => {
  let Categoty = objectId(req.params.CategoryID)
};
export const ListBySimilarService = async () => {};
export const ListByKeywordService = async () => {};
export const ListByRemarkService = async () => {};
export const DetailsService = async () => {};
export const ReviewListService = async () => {};
