import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

export const generateTokens = (user) => {
  try {
    const accessToken = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.ACCESS_SECRET_KEY,
      {
        expiresIn: "20m",
      }
    );
    // refresh tokens must caarry the minimum possible data
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("Token generation failed");
  }
};
