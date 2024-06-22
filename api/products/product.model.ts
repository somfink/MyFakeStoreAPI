import { Schema, model } from 'mongoose';

type Product = {
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
});

const Product = model<Product>('Product', productSchema);

export default Product;
