import { Router } from "express";
import { getProducts, getProduct, postProduct, getRandomProducts } from "../controllers/product.js";

const router = Router();

router.get('/random', getRandomProducts);
router.post('/', postProduct);
router.get('/:id', getProduct);
router.get('/', getProducts);

export default router;