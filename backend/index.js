import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve `__dirname` in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fragnifique');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('MongoDB Connection Failed: ', error);
        process.exit(1);
    }
};

dbConnection();

import userRoutes from './routes/user.js';
import productRoutes from './routes/product.js';
import reviewRoutes from './routes/review.js';

const app = express();

app.use(cookieParser());
app.use(cors({
    origin: 'fragnifique.prabhatkumar.site', // Replace with your frontend's URL
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from the dist folder
const distPath = path.resolve(__dirname, '../frontend/dist');
app.use(express.static(distPath));

// API routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);

// Catch-all route to serve the index.html for Single Page Applications (SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

// Fallback route for the root path
app.get('/', (req, res) => {
    res.status(301).send('There is nothing for me to serve on this route');
});

// Start the server
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running at PORT ${process.env.PORT || 5000}`);
});
