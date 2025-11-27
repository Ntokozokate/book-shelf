import { Book } from "../models/Book.js";

export const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find({});
    if (allBooks?.length > 0) {
      res.status(200).json({
        success: true,
        message: "Books fetched successfully",
        data: allBooks,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Book data base is empty",
      });
    }
  } catch (error) {
    console.error("Could not get books", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getOneBookById = async (req, res) => {
  try {
    const currentBookId = req.params.id;
    const bookDetailsById = await Book.findById(currentBookId);

    if (!bookDetailsById) {
      return res.status(404).json({
        success: false,
        message: `Id: ${currentBookId} was not found, Try with a different ID`,
      });
    }
    res.status(200).json({ success: true, data: bookDetailsById });
  } catch (error) {
    console.error("Could not get book", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const addNewBook = async (req, res) => {
  try {
    const newBookFormData = req.body;
    const newBook = await Book.create(newBookFormData);
    if (newBookFormData) {
      res.status(201).json({
        success: true,
        message: "Book added successfully",
        data: newBook,
      });
    }
  } catch (error) {
    console.error("Could not add new Book", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//1 declare the body of future content
//2 declare  or get the ID
//3 get the data by imput id
//4 pass in the body aswelll into the  to be updatedbook
//5 to ensure to pass new property to get the updated book back
export const updateBook = async (req, res) => {
  try {
    const updatedFormBookData = req.body;
    const currentBookId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(currentBookId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid book ID format",
      });
    }
    const updatedBook = await Book.findByIdAndUpdate(
      currentBookId,
      updatedFormBookData,
      { new: true, runValidators: true }
    );
    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "That book Id could not be found to edit it",
      });
    }
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    console.error("Updating book failed", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const currentBookId = req.params.id;
    const deletedBook = await Book.findByIdAndDelete(currentBookId);
    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "That book Id could not be found to delete it",
      });
    }
    res.status(200).json({ success: true, data: deletedBook });
  } catch (error) {
    console.error("Could not delete book", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
