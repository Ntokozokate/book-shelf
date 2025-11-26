import express from "express";
import {
  addNewBook,
  deleteBook,
  getAllBooks,
  getOneBookById,
  updateBook,
} from "../controllers/book.controller.js";

const router = express.Router();

//Book related routes
router.get("/get", getAllBooks); // work
router.get("/get/:id", getOneBookById);
router.post("/add", addNewBook); // we work with the req.body, modify it to enter the DB safely
router.put("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);

export default router;
