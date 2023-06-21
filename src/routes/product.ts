import express from 'express';
import { createProduct, getProducts } from '../controller/product';

const productRoutes = express.Router();

productRoutes.get('/', getProducts);
productRoutes.post('/', createProduct);

export default productRoutes;
