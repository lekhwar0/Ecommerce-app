import express from "express";

import {
  registerController,
  loginController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} from "../controllers/authController.js";

import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
//router object

const router = express.Router();

//routing
//REGISTER || METHOD POST

router.post("/register", registerController);

//LOGIN || POST
// router.post("/login", requireSignIn, isAdmin, loginController);
router.post("/login", loginController);

//forgot password || POST
router.post("/forgot-password", forgotPasswordController);

//protect user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protect admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/update-profile", requireSignIn, updateProfileController);

//orders
router.get("/get-orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

//update orders state by admin
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;