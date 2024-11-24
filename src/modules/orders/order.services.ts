import ProductModel from '../products/product.model';
import { IOrder } from './order.interface';
import OrderModel from './order.model';

/*Service to create a new order and update product inventory*/ 
type OrderInput = Pick<IOrder, 'email' | 'product' | 'quantity' | 'totalPrice'>;

/* Service to create a new order and update product inventory */
export const createOrderService = async (orderData: OrderInput) => {
  try {
    // Validate input data
    if (
      !orderData.email ||
      !orderData.product ||
      !orderData.quantity ||
      !orderData.totalPrice
    ) {
      throw new Error(
        'Missing required fields: email, product, quantity, or totalPrice.',
      );
    }

    // Check if the product exists
    const product = await ProductModel.findById(orderData.product);

    if (!product) {
      throw new Error('Product not found');
    }

    // Check if there's enough stock
    if (product.quantity < orderData.quantity) {
      throw new Error(
        `Insufficient stock. Only ${product.quantity} items are available.`,
      );
    }

    // Update product stock
    product.quantity -= orderData.quantity;
    if (product.quantity === 0) {
      product.inStock = false;
    }
    await product.save();

    // Create a new order
    const newOrder = new OrderModel(orderData);
    const savedOrder = await newOrder.save();

    return savedOrder;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create order: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while creating the order.');
    }
  }
};

// Service to calculate total revenue from orders
export const calculateRevenueService = async () => {
  try {
    // Aggregate the orders to calculate the total revenue
    const totalRevenueData = await OrderModel.aggregate([
      {
        $lookup: {
          from: 'products', 
          localField: 'product',
          foreignField: '_id',
          as: 'productDetails',
        },
      },
      { $unwind: '$productDetails' },
      {
        $project: {
          totalPrice: 1,
          price: { $multiply: ['$quantity', '$productDetails.price'] },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$price' },
        },
      },
    ]);

    // Extract the revenue from the aggregation result
    const totalRevenue =
      totalRevenueData.length > 0 ? totalRevenueData[0].totalRevenue : 0;

    return totalRevenue;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to calculate revenue: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while calculating revenue.');
    }
  }
};
