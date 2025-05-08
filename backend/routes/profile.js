import { Router } from "express";
import updateProfile from "../controllers/profile.js";
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();

router.patch('/:id', verifyToken, updateProfile);

export default router;