import { Document } from "mongoose";

// Enum or specific types if needed for order states, etc. You can expand it later.
export interface IOrder extends Document {
  email: string;
  product: string; 
  quantity: number;
  totalPrice: number;
}
