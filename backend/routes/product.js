import { Router } from "express";
import { getProducts, getProduct, postProduct, getRandomProducts } from "../controllers/product.js";
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();

router.get('/random', getRandomProducts);
router.post('/', verifyToken, postProduct);
router.get('/:id', getProduct);
router.get('/', getProducts);

export default router;