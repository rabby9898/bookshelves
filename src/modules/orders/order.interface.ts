import { Types, Document } from 'mongoose';
export interface IOrder extends Document {
  email: string;
  product: Types.ObjectId; // Correct TypeScript definition
  quantity: number;
  totalPrice: number;
}
