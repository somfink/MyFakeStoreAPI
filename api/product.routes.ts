import { Router } from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from './product.controller';

const router = Router();

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;
