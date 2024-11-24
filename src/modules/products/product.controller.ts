import { Request, Response } from "express";
import {
  createBookService,
  deleteBookService,
  getAllBooksService,
  getBookByIdService,
  updateBookService,
} from "./product.services";
import mongoose from "mongoose";

const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const productData = req.body.product;

    if (!productData) {
      res.status(400).json({
        message: "Product data is missing.",
        success: false,
      });
      return;
    }

    const newBook = await createBookService(productData);

    res.status(201).json({
      message: "Book created successfully",
      success: true,
      data: newBook,
    });
  } catch (error) {
    res.status(500).json({
      message: `Failed to create book: ${(error as Error).message}`,
      success: false,
    });
  }
};

const getAllBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const searchTerm = req.query.searchTerm as string | undefined;
    const books = await getAllBooksService(searchTerm);

    res.status(200).json({
      message: "Books retrieved successfully",
      success: true,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      message: `Failed to retrieve books: ${(error as Error).message}`,
      success: false,
    });
  }
};

const getBookById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({
        message: "Invalid Product ID format.",
        success: false,
      });
      return;
    }

    const book = await getBookByIdService(productId);

    if (!book) {
      res.status(404).json({
        message: "Book not found.",
        success: false,
      });
      return;
    }

    res.status(200).json({
      message: "Book retrieved successfully",
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      message: `Failed to retrieve book: ${(error as Error).message}`,
      success: false,
    });
  }
};

const updateBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const updatedData = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({
        message: "Invalid Product ID format.",
        success: false,
      });
      return;
    }

    const updatedBook = await updateBookService(productId, updatedData);

    if (!updatedBook) {
      res.status(404).json({
        message: "Book not found.",
        success: false,
      });
      return;
    }

    res.status(200).json({
      message: "Book updated successfully",
      success: true,
      data: updatedBook,
    });
  } catch (error) {
    res.status(500).json({
      message: `Failed to update book: ${(error as Error).message}`,
      success: false,
    });
  }
};

const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({
        message: "Invalid Product ID format.",
        success: false,
      });
      return;
    }

    const deletedBook = await deleteBookService(productId);

    if (!deletedBook) {
      res.status(404).json({
        message: "Book not found.",
        success: false,
      });
      return;
    }

    res.status(200).json({
      message: "Book deleted successfully",
      success: true,
      data: deletedBook,
    });
  } catch (error) {
    res.status(500).json({
      message: `Failed to delete book: ${(error as Error).message}`,
      success: false,
    });
  }
};

export const productController = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
