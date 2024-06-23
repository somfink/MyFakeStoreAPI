import { PaginateModel, Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

enum ProductCategory {
  Electronics = "Electronics",
  Computers = "Computers",
  SmartHome = "Smart Home",
  Gaming = "Gaming",
  Wearables = "Wearables",
  Cameras = "Cameras",
  HomeAppliances = "Home Appliances",
  Accessories = "Accessories",
  Drones = "Drones",
}

type Product = {
  name: string;
  price: number;
  description: string;
  category: ProductCategory;
  image: string;
};

const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ProductCategory, required: true },
  image: { type: String, required: true },
});

productSchema.plugin(mongoosePaginate);

const Product = model<Product, PaginateModel<Product>>(
  "Product",
  productSchema
);

export default Product;
