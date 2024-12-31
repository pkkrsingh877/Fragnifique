import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config.js';
import cookieParser from 'cookie-parser';

// Connect to MongoDB

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fragnifique');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('MongoDB Connection Failed: ', error);
        process.exit(1);
    }
}

dbConnection();


import userRoutes from './routes/user.js';
import productRoutes from './routes/product.js';
import reviewRoutes from './routes/review.js';

const app = express();


app.use(cookieParser());
// Cors Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    credentials: true, // Allow cookies/credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow the methods your app needs
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify which headers are allowed in the request
}));

// Handle preflight request explicitly for certain methods
app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Match the origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allowed methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials
    res.status(200).end(); // End the response to the OPTIONS request
});



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mounting API routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/', (req, res) => {
    res.status(301).send('There is nothing for me to serve on this route');
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running at PORT ${process.env.PORT || 5000}`);
});