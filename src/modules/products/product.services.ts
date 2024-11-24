import { IProduct } from './product.interface';
import ProductModel from './product.model';

// Create a new book (Product)
export const createBookService = async (bookData: IProduct) => {
  try {
    // Validate input data
    if (
      !bookData.title ||
      !bookData.author ||
      !bookData.price ||
      !bookData.category ||
      !bookData.quantity ||
      bookData.inStock === undefined
    ) {
      throw new Error(
        'Missing required fields: title, author, price, category, quantity, or inStock.',
      );
    }

    const newBook = new ProductModel(bookData);
    const savedBook = await newBook.save();
    return savedBook;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to create book: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while creating the book.');
    }
  }
};

// Get all books or search by category, title, or author
export const getAllBooksService = async (searchTerm?: string) => {
  try {
    let query = {};
    if (searchTerm) {
      query = {
        $or: [
          { title: { $regex: searchTerm, $options: 'i' } },
          { author: { $regex: searchTerm, $options: 'i' } },
          { category: { $regex: searchTerm, $options: 'i' } },
        ],
      };
    }
    const books = await ProductModel.find(query);
    return books;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to retrieve books: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while retrieving books.');
    }
  }
};

// Get a specific book by ID
export const getBookByIdService = async (productId: string) => {
  try {
    // Validate the productId format
    if (!productId || productId.length !== 24) {
      throw new Error('Invalid product ID format');
    }

    const book = await ProductModel.findById(productId);
    if (!book) {
      throw new Error('Book not found');
    }
    return book;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to retrieve book: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while retrieving the book.');
    }
  }
};

// Update a book by ID
export const updateBookService = async (
  productId: string,
  updatedData: Partial<IProduct>,
) => {
  try {
    // Validate the productId format
    if (!productId || productId.length !== 24) {
      throw new Error('Invalid product ID format');
    }

    const updatedBook = await ProductModel.findByIdAndUpdate(
      productId,
      updatedData,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedBook) {
      throw new Error('Book not found');
    }
    return updatedBook;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to update book: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while updating the book.');
    }
  }
};

// Delete a book by ID
export const deleteBookService = async (productId: string) => {
  try {
    // Validate the productId format
    if (!productId || productId.length !== 24) {
      throw new Error('Invalid product ID format');
    }

    const deletedBook = await ProductModel.findByIdAndDelete(productId);
    if (!deletedBook) {
      throw new Error('Book not found');
    }
    return deletedBook;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to delete book: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while deleting the book.');
    }
  }
};
