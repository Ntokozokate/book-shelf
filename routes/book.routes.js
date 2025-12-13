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

const router = express.Router();

//Book related routes
router.get("/get", getAllBooks); // work
router.get("/get/:id", getOneBookById);
router.post("/addMany", addManyBooks);
router.get("/getAvgPrice", calculateAvgBookPrice);
router.get("/getAvgPricePerGenre", avgBookPricePerGenre);
router.get("/mostExpensiveBooks", mostExpensiveBooks);
//router.get("/getAvgPricePerGenre", AvgBookPricePerGenre);
router.post("/add", addNewBook); // we work with the req.body, modify it to enter the DB safely
router.put("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);

export default router;
