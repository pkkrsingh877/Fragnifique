import { Router } from "express";
import { getProducts, getProduct, postProduct } from "../controllers/product.js";

const router = Router();

router.post('/', postProduct);
router.get('/:id', getProduct);
router.get('/', getProducts);

export default router;