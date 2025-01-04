import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // Check both sources

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded._id); // Attach user to request
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(401).json({ success: false, message: 'Token verification failed' });
    }
};
