import { Router } from "express";
import { postReview, updateReview } from "../controllers/review.js";

const router = Router();

router.patch('/:id', updateReview);
router.post('/', postReview);

export default router;