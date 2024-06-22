import { Request, Response } from "express";
import Product from "./product.model";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();

    const { category, name, pageSize, itemLimit } = req.query;

    if (category) {
      const filteredProducts = await Product.find({
        category,
      });

      return res.json(filteredProducts);
    }

    if (name) {
      const filteredProducts = await Product.find({
        title: { $regex: name, $options: "i" },
      });

      return res.json(filteredProducts);
    }

    if (pageSize && itemLimit) {
      const filteredProducts = products?.reduce((product) => product, []);

      return res.json(filteredProducts);
    }
    return res.json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, description, category, image } = req.body;
    const newProduct = new Product({
      name,
      price,
      description,
      category,
      image,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
