import { Router } from "express";
import { createOrder, getOrders, getOrderById } from "../controllers/order.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.post("/", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);
router.get("/:id", verifyToken, getOrderById);

export default router;