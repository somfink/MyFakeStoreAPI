import express from "express";
import connectDB from "./database";
import productRoutes from "./products/product.routes";
import dotenv from "dotenv";
import swaggerUI from "swagger-ui-express";
import { swaggerSpec } from "./swagger";

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use("/api", productRoutes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/api`);
  });
});

export default app;
