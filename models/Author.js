import mongoose from "mongoose";

const AuthorSchema = new mongoose.Schema({
  name: String,
  country: String,
  _id: String,
});
export const Author = mongoose.model("Author", AuthorSchema);
