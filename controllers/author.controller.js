import { Author } from "../models/Author.js";

//add author to db
//get all outhors
//get author by ID

export const createAuthor = async (req, res) => {
  try {
    const newAuthorForm = req.body;
    //check if there is input
    if (!newAuthorForm || Object.keys(newAuthorForm).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please enter Author details",
      });
    }
    //check if author being added doesnt already exist
    const existingAuthor = await Author.findOne({ name: newAuthorForm.name });
    if (existingAuthor) {
      return res.status(409).json({
        success: false,
        message: `Author named '${newAuthorForm.name}' already exists.`,
        data: existingAuthor,
      });
    }
    //create author if all checks out
    const newAuthor = await Author.create(newAuthorForm);
    if (newAuthor) {
      return res.status(201).json({
        success: true,
        message: "Author created successfully",
        data: newAuthor,
      });
    }
  } catch (error) {
    console.error("Could not create new Author");
    res.status(500).json({
      success: false,
      message: "Author not created",
      error,
    });
  }
};

export const getAuthors = async (req, res) => {
  try {
    const allAuthors = await Author.find({});
    if (allAuthors.length > 0) {
      return res.status(200).json({
        success: true,
        message: "fetched all available Authors",
        data: allAuthors,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "database is empty",
      });
    }
  } catch (error) {
    console.error("Could not get Authors");
    res.status(500).json({
      success: false,
      message: "failed to get authors",
      error,
    });
  }
};

export const getAuthorById = async (req, res) => {
  try {
    const authorId = req.params.id;

    //get the author from DB
    const author = await Author.findById(authorId);
    if (!author) {
      return res.status(404).json({
        success: false,
        message: `Id: ${authorId} was not found, Try with a different ID`,
      });
    } else {
      return res.status(200).json({
        success: true,
        data: author,
      });
    }
  } catch (error) {
    console.error("Could not get Author");
    res.status(500).json({
      success: false,
      message: "failed to get author",
      error,
    });
  }
};
