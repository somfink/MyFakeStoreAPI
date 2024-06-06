import express from 'express';
import connectDB from './database';
import productRoutes from './product.routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api', productRoutes);

connectDB().then(() => {
  console.log('MongoDB connected');
});

export default app;
