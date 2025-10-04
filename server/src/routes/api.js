import express from "express";
import { forgotPasswordController, login, register } from "../controllers/autoController.js";
import { authenticate } from "../middlewars/autthenticate.js";
import {
  ProductCategoryList,
  ProductDetails,
  ProductListByCategory,
  ProductListByKeyword,
  ProductListByRemark,
  ProductListBySimilar,
  ProductReviewList,
  ProductSliderList,
} from "../controllers/productController.js";
import { isAdmin } from "../middlewars/AdminAuth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// PRODUCT-ROUTES
router.get("/ProductCategoryList", authenticate, ProductCategoryList);
router.get("/ProductSliderList", authenticate, ProductSliderList);
router.get("/ProductListBySimilar/:Similar",authenticate,ProductListBySimilar);
router.get("/ProductListByKeyword/:Keyword",authenticate,ProductListByKeyword);
router.get("/ProductListByRemark/:Remark", authenticate, ProductListByRemark);
router.get("/ProductDetails/:ProductID", authenticate, ProductDetails);
router.get("/ProductReviewList/:ProductID", authenticate, ProductReviewList);
router.get("/ProductListByCategory/:CategoryID",authenticate,ProductListByCategory);


//PROTECTED-USER-AUTH
router.get("/profile", authenticate, (req, res) => {
  res.status(200).send({ ok: true });
});
//PROTECTED-ADMIN-AUTH
router.get("/admin", authenticate, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//FORGOT-PASSWORD
router.post('/forgot-password', forgotPasswordController)
export default router;
