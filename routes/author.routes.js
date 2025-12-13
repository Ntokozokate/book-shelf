import express from "express";
import {
  addManyAuthors,
  createAuthor,
} from "../controllers/author.controller.js";

//add author
//get all authors
//get author by Id

const router = express.Router();

router.post("/add", createAuthor);
router.post("/addMany", addManyAuthors);

export default router;
