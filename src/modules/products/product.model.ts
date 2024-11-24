import mongoose, { Schema } from 'mongoose';
import { BookCategory, IProduct } from './product.interface';

// Mongoose schema for the Product
const productSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    enum: Object.values(BookCategory),
    required: true,
  },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

// Define the Product model using the schema
const ProductModel = mongoose.model<IProduct>('Product', productSchema);

export default ProductModel;
