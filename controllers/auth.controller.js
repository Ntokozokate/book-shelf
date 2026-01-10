import { User } from "../models/User.js";
import { generateTokens } from "../utils/generate.tokens.js";
import bcrypt from "bcryptjs";

import dotenv from "dotenv";
dotenv.config();

export const signUp = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter your details to register",
      });
    }
    username = username.trim();
    email = email.trim().toLowerCase();

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be atleast 6 characters",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const doesUserExist = await User.findOne({ email });
    if (doesUserExist) {
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      });
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    //create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const { accessToken, refreshToken } = generateTokens(user._id);

    //hash token before saving token
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    //save refresh token inside db
    user.refreshToken = hashedRefreshToken;
    await user.save({ validateBeforeSave: false });

    //Store refresh token in cookis and accesstoken in response
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      accessToken,
      data: {
        username: user.username,
        email: user.email,
        role: user.role,
        id: user._id,
      },
    });
  } catch (error) {
    console.log("Error signing up", error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter your details to login",
      });
    }

    email = email.trim().toLowerCase();

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    //Generate tokens
    const { accessToken, refreshToken } = generateTokens(user);

    //hash token and store in db
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    user.refreshToken = hashedRefreshToken;
    await user.save({ validateBeforeSave: false });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      data: {
        username: user.username,
      },
    });
  } catch (error) {
    console.log("Error signing up", error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken");

    await User.findByIdAndUpdate(req.userId, { refreshToken: null });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log("Error logging out", error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};
