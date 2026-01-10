//import { User } from "../models/User.js";

export const adminOnly = async (req, res, next) => {
  try {
    //protectRoutes must run first
    // so we dont call db again,

    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access only",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Authorization failed",
    });
  }
};
