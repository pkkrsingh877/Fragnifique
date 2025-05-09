import { Router } from "express";
import { deleteProduct, getMyProducts, getProducts, getProduct, postProduct, getRandomProducts } from "../controllers/product.js";
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();

router.get('/me', verifyToken, getMyProducts);
router.get('/random', getRandomProducts);
router.post('/', verifyToken, postProduct);
router.delete('/:id', verifyToken, deleteProduct);
router.get('/:id', getProduct);
router.get('/', getProducts);


export default router;