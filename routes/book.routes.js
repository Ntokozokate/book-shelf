import express from "express";
import {
  addManyBooks,
  addNewBook,
  avgBookPricePerGenre,
  calculateAvgBookPrice,
  deleteBook,
  getAllBooks,
  getOneBookById,
  mostExpensiveBooks,
  updateBook,
} from "../controllers/book.controller.js";
import { adminOnly } from "../middleware/adminOnly.middleware.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// 1. STATS ROUTES (Specific paths first!)
router.get("/getAvgPrice", protectRoute, calculateAvgBookPrice);
router.get("/getAvgPricePerGenre", protectRoute, avgBookPricePerGenre);
router.get("/mostExpensiveBooks", protectRoute, mostExpensiveBooks);

// 2. GENERAL GET ROUTES
router.get("/get", protectRoute, getAllBooks);
router.get("/get/:id", protectRoute, getOneBookById);

// 3. ADMIN ONLY ROUTES (Require both middlewares)
router.post("/add", protectRoute, adminOnly, addNewBook);
router.post("/addMany", protectRoute, adminOnly, addManyBooks);
router.put("/update/:id", protectRoute, adminOnly, updateBook);
router.delete("/delete/:id", protectRoute, adminOnly, deleteBook);
export default router;
