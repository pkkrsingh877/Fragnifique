import { Router } from "express";
import { getReviews, postReview } from "../controllers/review.js";

const router = Router();

router.post('/', postReview);
router.get('/:product', getReviews);

export default router;