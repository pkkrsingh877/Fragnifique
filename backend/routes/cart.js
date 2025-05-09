import { Router } from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cart.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.post("/", verifyToken, addToCart);
router.get("/", verifyToken, getCart);
router.delete("/:id", verifyToken, removeFromCart);

export default router;