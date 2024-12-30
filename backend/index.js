import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config.js';

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

// Cors Middleware
app.use(cors({
    origin: ['http://localhost:5173'], // Replace with your frontend's URL
    credentials: true
}));

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