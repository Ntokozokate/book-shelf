import { generateTokens } from "./generateTokens.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

// ------------------------
// USER SIGNUP
// ------------------------
export const signup = async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashedPassword });

  const { accessToken, refreshToken } = generateTokens(user._id);

  // Set refresh token in secure httpOnly cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: ENV.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    message: "Signup successful",
    accessToken,
    user: { id: user._id, email: user.email },
  });
};

// ------------------------
// USER LOGIN
// ------------------------
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  const { accessToken, refreshToken } = generateTokens(user._id);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: ENV.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    message: "Login successful",
    accessToken,
    user: { id: user._id, email: user.email },
  });
};

// ------------------------
// REFRESH TOKEN ENDPOINT
// ------------------------
export const refreshAccessToken = (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token" });

  try {
    const decoded = jwt.verify(refreshToken, ENV.REFRESH_TOKEN_SECRET);

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      decoded.userId
    );

    // Rotate refresh token (optional but recommended)
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: ENV.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (error) {
    return res.status(401).json({ message: "Expired refresh token" });
  }
};
