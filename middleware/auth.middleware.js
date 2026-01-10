import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

export const protectRoute = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        success: false,
        message: "No token provided, authorization denied",
      });
    }
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY);

    //asign the decoded argument to the request
    //  (we intercept the request body before it gets to the endpoint )
    req.user = {
      id: decoded.userId,
      role: decoded.role,
    };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unuthorized: Token expired token or invalid",
    });
  }
};
