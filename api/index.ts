import express from 'express';
import connectDB from './database';
import productRoutes from './product.routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', productRoutes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});

export default app;
