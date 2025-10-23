import express from "express";
import {
  allOrdersController,
  deletePaymentController,
  forgotPasswordController,
  login,
  orderStatusController,
  register,
} from "../controllers/autoController.js";
import { authenticate } from "../middlewars/autthenticate.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productBgPhotoController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  productStatsController,
  searchProductController,
  
  updateProductController,
} from "../controllers/productController.js";
import { isAdmin } from "../middlewars/AdminAuth.js";
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  simpleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

import formidable from "express-formidable";
import { updateProfileController } from "../controllers/userController.js";
import {
  createPayment,
  getAllPayments,
  getPaymentById,
  getUserPayments,
} from "../controllers/paymentController.js";
import { createNoteController, deleteNoteController, noteController, simpleNoteController, updateNoteController } from "../controllers/orderNoteSelectController.js";
import { addReviewAndRating, approveReview, deleteReview, editReview, getAllReviews, getReviewsByProduct} from "../controllers/reviewAndRatingController.js";



const router = express.Router();

router.post("/register", register);
router.post("/login", login);

//PROTECTED-USER-AUTH
router.get("/profile", authenticate, (req, res) => {
  res.status(200).send({ ok: true });
});
//PROTECTED-ADMIN-AUTH
router.get("/admin", authenticate, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//FORGOT-PASSWORD
router.post("/forgot-password", forgotPasswordController);


//CREATE-CATEGORY
router.post(
  "/create-category",
  createCategoryController
);

//UPDATE-CATEGORY
router.put(
  "/update-category/:id",
  updateCategoryController
);

//ALL-CATEGORY
router.get("/get-category", categoryController);

//SIMPLE-CATEGORY
router.get("/simple-category/:slug", simpleCategoryController);

//DELETE-CATEGORY
router.delete(
  "/delete-category/:id",
  deleteCategoryController
);




//CREATE-NOTE
router.post(
  "/create-note",
  createNoteController
);

//UPDATE-NOTE
router.put(
  "/update-note/:id",
  updateNoteController
);

//ALL-NOTE
router.get("/get-note", noteController);

//SIMPLE-NOTE
router.get("/simple-note/:slug", simpleNoteController);

//DELETE-NOTE
router.delete(
  "/delete-note/:id",
  deleteNoteController
);




//CREATE-PRODUCT
router.post(
  "/create-product",
  authenticate,
  isAdmin,
  formidable(),
  createProductController
);

//GET-PRODUCT
router.get("/get-product", getProductController);

//SINGLE-PRODUCT
router.get("/get-product/:slug", getSingleProductController);

//PRODUCT-PHOTO
router.get("/get-product-photo/:pid", productPhotoController);

router.get("/get-product-bgphoto/:pid", productBgPhotoController);


//PRODUCT-PHOTO
router.delete("/delete-product/:pid", deleteProductController);

// UPDATE-PRODUCT
router.put(
  "/update-product/:pid",
  authenticate,
  isAdmin,
  formidable(),
  updateProductController
);

//Filter Product
router.post("/product-filter", productFilterController)

//Product-count
router.get("/product-count", productCountController)

//PRODUCT-LIST
router.get("/product-list/:page", productListController)

//SEARCH-PRODUCT
router.get("/search/:keyword", searchProductController)

//UPDATE-PROFILE
router.put("/update-profile", authenticate, updateProfileController);


// ✅ User: Create payment
router.post("/payment/order", authenticate, createPayment);

// ✅ Admin: Get all payments
router.get("/payment", authenticate, getAllPayments);

// ✅ User: Get user-specific payments
router.get("/payment/my", authenticate, getUserPayments);
//Delete-Order
router.delete('/payment/:orderId',authenticate,isAdmin, deletePaymentController);

//CUSTOMER-ORDERS
//ALL-ORDERS
router.get("/all-orders", authenticate, allOrdersController);

//ORDERS-STATUS
router.put("/order-status/:orderId", authenticate, isAdmin, orderStatusController);

// ✅ Get single payment by ID 
router.get("/payment/:id", authenticate, getPaymentById);



//REVIEW 
router.post("/review-rating", authenticate, addReviewAndRating);
router.get("/reviews/:productId", getReviewsByProduct);
router.get("/admin/reviews", authenticate, isAdmin, getAllReviews);
router.delete("/admin/review/:reviewId", authenticate, isAdmin, deleteReview);

router.patch("/admin/review/approve/:reviewId", authenticate, isAdmin, approveReview);
router.patch("/admin/review/:reviewId", authenticate, isAdmin, editReview);


router.get("/admin/product-stats", authenticate, isAdmin, productStatsController);



export default router;
