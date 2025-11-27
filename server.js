import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectToBD } from "./database/db.js";
import bookRoutes from "./routes/book.routes.js";

const app = express();

const port = process.env.PORT || 3008;

connectToBD();

//middleware
app.use(express.json());

//Rotes
app.use("/api/books", bookRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
