import { Request, Response } from "express";
import { createOrderService, calculateRevenueService } from "./order.services";
import ProductModel from "../products/product.model";

// Controller to create a new order
const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, product, quantity, totalPrice } = req.body;

    // Validate input
    if (!email || !product || !quantity || !totalPrice) {
      return res.status(400).json({
        message: "Missing required fields. Please provide email, product, quantity, and totalPrice.",
        status: false,
      });
    }

    // Check if the product exists
    const productInStock = await ProductModel.findById(product);
    if (!productInStock) {
      return res.status(404).json({
        message: "Product not found.",
        status: false,
      });
    }

    // Check if the requested quantity is available in stock
    if (productInStock.quantity < quantity) {
      return res.status(400).json({
        message: `Insufficient stock. Only ${productInStock.quantity} items are available.`,
        status: false,
      });
    }

    // Prepare the order data
    const orderData = {
      email,
      product,
      quantity,
      totalPrice,
    };

    // Call the service function to create the order
    const newOrder = await createOrderService(orderData);

    // Reduce the stock quantity
    productInStock.quantity -= quantity;
    if (productInStock.quantity === 0) {
      productInStock.inStock = false; // Set inStock to false if out of stock
    }
    await productInStock.save();

    return res.status(201).json({
      message: "Order created successfully",
      status: true,
      data: newOrder,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: `Failed to create order: ${error.message}`,
        status: false,
      });
    } else {
      return res.status(500).json({
        message: "An unknown error occurred",
        status: false,
      });
    }
  }
};

// Controller to calculate total revenue from all orders
const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await calculateRevenueService();

    return res.status(200).json({
      message: "Revenue calculated successfully",
      status: true,
      data: {
        totalRevenue,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: `Failed to calculate revenue: ${error.message}`,
        status: false,
      });
    } else {
      return res.status(500).json({
        message: "An unknown error occurred",
        status: false,
      });
    }
  }
};

// Export the controller functions
export const orderController = {
  createOrder,
  calculateRevenue,
};
