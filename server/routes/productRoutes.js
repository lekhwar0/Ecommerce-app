import express from "express";
import formidable from "express-formidable";

import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  stripePaymentController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";

const router = express.Router();

//routes

//create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//get all product
router.get("/get-product", getProductController);

//get single product
router.get("/get-product/:slug", getSingleProductController);

//get product photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete("/delete-product/:pid", deleteProductController);

//update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search-product/:keyword", searchProductController);

//related product
router.get("/related-product/:pid/:cid", relatedProductController);

//category-wise product
router.get("/product-category/:slug", productCategoryController);

//payment routes
router.post("/create-checkout-session", requireSignIn, stripePaymentController);

export default router;
