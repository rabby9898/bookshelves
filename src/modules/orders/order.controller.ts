import { Request, Response } from "express";
import { createOrderService, calculateRevenueService } from "./order.services";

/* Controller to create a new order */

/* Controller to create a new order */
const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, product, quantity, totalPrice } = req.body;

    // Validate input
    if (!email || !product || !quantity || !totalPrice) {
      res.status(400).json({
        message:
          "Missing required fields. Please provide email, product, quantity, and totalPrice.",
        success: false,
      });
      return;
    }

    // Prepare the order data
    const orderData = {
      email,
      product,
      quantity,
      totalPrice,
    };

    // Create the order using the service
    const newOrder = await createOrderService(orderData);

    res.status(201).json({
      message: "Order created successfully",
      success: true,
      data: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: `Failed to create order: ${(error as Error).message}`,
      success: false,
    });
  }
};


/* Controller to calculate total revenue from all orders */
const calculateRevenue = async (req: Request, res: Response): Promise<void> => {
  try {
    const totalRevenue = await calculateRevenueService();

    res.status(200).json({
      message: "Revenue calculated successfully",
      success: true,
      data: {
        totalRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: `Failed to calculate revenue: ${(error as Error).message}`,
      success: false,
    });
  }
};

/* Export the controller functions */
export const orderController = {
  createOrder,
  calculateRevenue,
};
