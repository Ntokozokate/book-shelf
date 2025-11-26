import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Book title is required "],
    trim: true,
    maxlength: [50, "Book title cannot be more that 50 characters"],
  },
  author: {
    type: String,
    required: [true, "author name is required "],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, "Publication date required"],
    min: [1000, "Year must be atleast year 1000"],
    max: [new Date().getFullYear(), "Year cannot be in the future"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Book = mongoose.model("Book", bookSchema);
