import JWT, { decode } from "jsonwebtoken";
import userModel from "../models/userModel.js";

//protected Routes token based
export const requireSignIn = async (req, res, next) => {
  try {
    const decodeToken = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decodeToken;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Error in requireSignIn middleware",
      error,
    });
  }
};

//admin access

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Error in admin middleware",
      error,
    });
  }
};
