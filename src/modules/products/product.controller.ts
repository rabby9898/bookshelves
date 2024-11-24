import { Request, Response } from "express";

import mongoose from "mongoose";
import { createBookService, deleteBookService, getAllBooksService, getBookByIdService, updateBookService } from "./product.services";

// Controller to create a new book (Product)
const createBook = async (req: Request, res: Response) => {
  try {
    // Extract the product data from the request body
    const productData = req.body.product;

    // Call the service function to create the book
    const newBook = await createBookService(productData);

    return res.status(201).json({
      message: "Book created successfully",
      success: true,
      data: newBook
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: `Failed to create book: ${error.message}`,
        success: false
      });
    } else {
      return res.status(500).json({
        message: "An unknown error occurred while creating the book.",
        success: false
      });
    }
  }
};

// Controller to get all books or search by category, title, or author
const getAllBooks = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string | undefined;
    const books = await getAllBooksService(searchTerm);

    return res.status(200).json({
      message: "Books retrieved successfully",
      success: true,
      data: books,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: `Failed to retrieve books: ${error.message}`,
        success: false,
      });
    } else {
      return res.status(500).json({
        message: "An unknown error occurred while retrieving the books.",
        success: false,
      });
    }
  }
};

// Controller to get a specific book by ID
const getBookById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    // Validate that productId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        message: "Invalid Product ID format",
        success: false,
      });
    }

    // Call service to get book by ID
    const book = await getBookByIdService(productId);

    // If the book doesn't exist, return a 404 error
    if (!book) {
      return res.status(404).json({
        message: "Book not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Book retrieved successfully",
      success: true,
      data: book,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: `Failed to retrieve book: ${error.message}`,
        success: false,
      });
    } else {
      return res.status(500).json({
        message: "An unknown error occurred while retrieving the book.",
        success: false,
      });
    }
  }
};

// Controller to update a book by ID
const updateBook = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedBookDetails = req.body;

    // Validate the productId format
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        message: "Invalid Product ID format",
        success: false,
      });
    }

    // Call service to update the book
    const updatedBook = await updateBookService(productId, updatedBookDetails);

    // If the book is not found or not updated, return a 404 error
    if (!updatedBook) {
      return res.status(404).json({
        message: "Book not found or failed to update",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Book updated successfully",
      success: true,
      data: updatedBook,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: `Failed to update book: ${error.message}`,
        success: false,
      });
    } else {
      return res.status(500).json({
        message: "An unknown error occurred while updating the book.",
        success: false,
      });
    }
  }
};

// Controller to delete a book by ID
const deleteBook = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    // Validate the productId format
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        message: "Invalid Product ID format",
        success: false,
      });
    }

    // Call service to delete the book
    const deletedBook = await deleteBookService(productId);

    // If the book is not found, return a 404 error
    if (!deletedBook) {
      return res.status(404).json({
        message: "Book not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Book deleted successfully",
      success: true,
      data: {},
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: `Failed to delete book: ${error.message}`,
        success: false,
      });
    } else {
      return res.status(500).json({
        message: "An unknown error occurred while deleting the book.",
        success: false,
      });
    }
  }
};

export const productController = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
