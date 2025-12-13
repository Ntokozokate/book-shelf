import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

export const generateTokens = (userId) => {
  try {
    const accessToken = jwt.sign(
      {
        userId,
      },
      process.env.ACCESS_SECRET_KEY,
      {
        expiresIn: "20m",
      }
    );
    const refreshToken = jwt.sign(
      {
        userId,
      },
      process.env.REFRESH_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error(`Token generation failed: ${error.message}`);
  }
};
