import express from "express";
import { createAuthor } from "../controllers/author.controller.js";

//add author
//get all authors
//get author by Id

const router = express.Router();

router.post("/add", createAuthor);

export default router;
