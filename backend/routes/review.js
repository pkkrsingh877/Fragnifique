import { Router } from "express";
import { postReview, updateReview } from "../controllers/review.js";
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();

router.patch('/:id', verifyToken, updateReview);
router.post('/', verifyToken, postReview);

export default router;