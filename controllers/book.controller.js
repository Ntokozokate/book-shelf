import mongoose from "mongoose";
import { Book } from "../models/Book.js";
import { success } from "zod";

export const getAllBooks = async (req, res) => {
  try {
    //pagination
    const page = parseInt(req.query.page) || 2;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    //const allBooks = await Book.find({}); red
    const allBooks = await Book.aggregate([
      {
        $sort: {
          createdAt: 1,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $project: {
          title: 1,
          author: 1,
          yearPublished: 1,
          year: 1,
          _id: 0,
        },
      },
    ]);
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
    //const bookDetailsById = await Book.findById(currentBookId).populate(
    //  "author"
    //);
    const bookWithAuthor = await Book.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(currentBookId),
        },
      },

      {
        $lookup: {
          from: "authors",
          localField: "author",
          foreignField: "_id",
          as: "bookWithAuthorDetails",
        },
      },
      {
        $unwind: "$bookWithAuthorDetails",
      },
      {
        $project: {
          ///we are returning the book and choosing the fields we want
          title: 1,
          genre: 1,
          authorName: "$bookWithAuthorDetails.name",
          _id: 0,
        },
      },
    ]);

    if (!bookWithAuthor || bookWithAuthor.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Id: ${currentBookId} was not found, Try with a different ID`,
      });
    }
    return res.status(200).json({
      success: true,
      data: bookWithAuthor,
    });
  } catch (error) {
    console.error("Could not get book", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const calculateAvgBookPrice = async (req, res) => {
  try {
    const allBookPrice = await Book.aggregate([
      {
        $group: {
          _id: null,
          avgBookPrice: {
            $avg: "$price",
          },
        },
      },
      {
        $project: {
          avgBookPrice: {
            $round: ["$avgBookPrice", 2],
          },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Calculated everage price",
      data: allBookPrice,
    });
  } catch (error) {
    console.error("Could not make calculation", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const AvgBookPricePerGenre = async (req, res) => {
  try {
    const allBookPrice = await Book.aggregate([
      {
        $group: {
          _id: "$genre",
          avgBookPrice: {
            $avg: "$price",
          },
        },
      },
      {
        $project: {
          avgBookPrice: {
            $round: ["$avgBookPrice", 2],
          },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Calculated everage price",
      data: allBookPrice,
    });
  } catch (error) {
    console.error("Could not make calculation", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const mostExpensiveBooks = async (req, res) => {
  try {
    const allBookPrice = await Book.aggregate([
      {
        $sort: {
          price: -1,
        },
      },
      {
        $limit: 3,
      },
      {
        $project: {
          _id: 0,
          title: 1,
          genre: 1,
          price: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Calculated most expensive books",
      data: allBookPrice,
    });
  } catch (error) {
    console.error("Could not make calculation", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
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
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const addManyBooks = async (req, res) => {
  try {
    const BooksArray = req.body;
    if (!Array.isArray(req.body)) {
      return res.status(400).json({
        success: false,
        message: "Request body should be an array of books",
      });
    }

    const savedbooksArray = await Book.insertMany(BooksArray);

    return res.status(201).json({
      success: true,
      message: "Books saved successfully",
      data: savedbooksArray,
    });
  } catch (error) {
    console.error("Could not add new Books", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
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
