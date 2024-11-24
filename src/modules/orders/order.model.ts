import mongoose, { Schema } from "mongoose";
import { IOrder } from "./order.interface";

// Mongoose schema for the Order
const orderSchema = new Schema<IOrder>({
  email: { type: String, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, 
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true }
}, { timestamps: true });

// Define the Order model using the schema
const OrderModel = mongoose.model<IOrder>("Order", orderSchema);

export default OrderModel;
