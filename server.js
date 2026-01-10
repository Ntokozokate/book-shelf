import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import express from "express";
import { connectToBD } from "./database/db.js";
import bookRoutes from "./routes/book.routes.js";
import authorRoutes from "./routes/author.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

const port = process.env.PORT || 3008;

connectToBD();

//middleware
app.use(express.json());
app.use(cookieParser());
//Rotes
app.use("/api/books", bookRoutes);
//book route
app.use("/api/author", authorRoutes);
//user route
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
