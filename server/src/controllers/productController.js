import { CategoryListService, DetailsService, ListByCategoryService,
     ListByKeywordService, ListByRemarkService, 
     ListBySimilarService, ReviewListService, SliderListService } from "../services/productService.js"

export const ProductCategoryList = async (req, res) => {
let result = await CategoryListService()
res.status(200).json(result)
}

export const ProductSliderList = async (req, res) => {
  let result = await SliderListService()
  res.status(200).json(result)
}
export const ProductListByCategory = async (req, res) => {
  let result = await ListByCategoryService(req)
  res.status(200).json(result)
}
export const ProductListBySimilar = async (req, res) => {
  let result = await ListBySimilarService()
  res.status(200).json(result)
}
export const ProductListByKeyword = async (req, res) => {
  let result = await ListByKeywordService()
  res.status(200).json(result)
}
export const ProductListByRemark = async (req, res) => {
  let result = await ListByRemarkService()
  res.status(200).json(result)
}
export const ProductDetails = async (req, res) => {
  let result = await DetailsService()
  res.status(200).json(result)
}
export const ProductReviewList = async (req, res) => {
  let result = await ReviewListService()
  res.status(200).json(result)
}
export const CreateProductReview = async (req, res) => {
  let result = await CreateReviewService(req.body)
  res.status(201).json(result)
}