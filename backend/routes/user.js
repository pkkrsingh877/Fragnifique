import { Router } from "express";
import { login, signup } from "../controllers/user.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import mongoose from "mongoose";

const router = Router();

// Middleware to check if the user is authenticated
router.get('/verifyToken', async (req, res) => {
    const token = req.cookies.token || '';  // Token sent in cookies
    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        // Convert decoded._id to ObjectId if it's a string
        const userId = new mongoose.Types.ObjectId(decoded._id);
        const user = await User.findById(userId); // Find user based on decoded ID
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, data: user });
    } catch (error) {
        console.error(error)
        res.status(401).json({ success: false, message: 'Token verification failed' });
    }
});

router.post('/signup', signup);
router.post('/login', login);

export default router;