import express from 'express';
import { createProduct } from '../controller/product';

const productRoutes = express.Router();

productRoutes.post('/', createProduct);

export default productRoutes;
