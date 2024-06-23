import { Request, Response } from "express";
import Product from "./product.model";

/**
 * @swagger
 * /products:
 *   get:
 *     parameters:
 *       - in: path
 *         name: category
 *         required: false
 *         type: string
 *         enum: ['Electronics', 'Computers', 'Smart Home', 'Gaming', 'Wearables', 'Cameras', 'Home Appliances', 'Accessories', 'Drones']
 *         description: The product category filter - returns all products with picked category.
 *       - in: path
 *         name: name
 *         required: false
 *         type: string
 *         description: The product name filter - returns all products matched with name.
 *       - in: path
 *         name: pageSize
 *         required: false
 *         type: number
 *         description: The product page size filter - returns products according to the quantity defined in pageSize. Should be given always with page number.
 *       - in: path
 *         name: page
 *         required: false
 *         type: number
 *         description: The product page filter - returns products according to theirs order on the pages.
 *     description: All products list
 *     responses:
 *       200:
 *         description: Returns all the products
 */

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category, name, pageSize, page } = req.query;

    const query: any = {};

    if (category) {
      query.category = category;
    }

    if (name) {
      query.title = { $regex: name, $options: "i" }; // case-insensitive regex match
    }

    if (pageSize && page) {
      const options = {
        page: Number(page),
        limit: Number(pageSize),
      };

      const products = await Product.paginate(query, options);

      return res.json(products);
    }

    const products = await Product.find(query);

    res.json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /products:
 *   post:
 *     parameters:
 *      - in: body
 *        name: product
 *        description: New product
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            price:
 *              type: number
 *            description:
 *              type: string
 *            category:
 *              type: string
 *              enum: ['Electronics', 'Computers', 'Smart Home', 'Gaming', 'Wearables', 'Cameras', 'Home Appliances', 'Accessories', 'Drones']
 *            image:
 *              type: string
 *     responses:
 *       201:
 *         description: Created
 */

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

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The product ID.
 *     description: Get a single product by id
 *     responses:
 *       200:
 *         description: Returns the requested product
 */

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

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The product ID to update.
 *      - in: body
 *        name: product
 *        description: Update product
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            price:
 *              type: number
 *            description:
 *              type: string
 *            category:
 *              type: string
 *              enum: ['Electronics', 'Computers', 'Smart Home', 'Gaming', 'Wearables', 'Cameras', 'Home Appliances', 'Accessories', 'Drones']
 *            image:
 *              type: string
 *     responses:
 *       201:
 *         description: Created
 */

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

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The product ID to delete.
 *     description: Delete a product by id
 *     responses:
 *       200:
 *         description: Returns the requested product */

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted", product: deletedProduct });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
