import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
                error: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
                error: "Incorrect password"
            });
        }

        const token = await jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '30d' });

        // Set cookie
        res.cookie("token", token, {
            sameSite: false
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: user
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Login failed",
            error: error.message
        });
    }
}

export const signup = async (req, res) => {
    try {
        const { name, email, password, isSeller } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
                error: "User already exists"
            });
        }

        const newUser = new User({
            name, email, password, isSeller
        });
        await newUser.save();

        const token = await jwt.sign({ id: newUser._id, email: newUser.email, name: newUser.name }, process.env.JWT_SECRET, { expiresIn: '30d' });

        // Set cookie
        res.cookie("token", token, {
            sameSite: false
        });

        return res.status(201).json({
            success: true,
            message: "Signup successful",
            data: newUser
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Signup failed",
            error: error.message
        });
    }
}