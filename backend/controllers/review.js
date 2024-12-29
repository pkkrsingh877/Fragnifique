import Review from '../models/review.js';

export const postReview = async (req, res) => {
    try {
        const { product: productId, user, rating, comment } = req.body;
        const review = new Review({
            user, rating, comment
        });
        await review.save();

        const product = await Product.findById(productId);
        product.reviews.push(review);
        await product.save();

        res.status(201).json({
            success: true,
            message: "Review posted successfully",
            data: review
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Review not posted",
            error: error.message
        });
    }
}

export const getReviews = async (req, res) => {
    try {
        const { product } = req.params;
        const reviews = await Product.findById(product).populate('reviews').select('reviews');
        res.status(200).json({
            success: true,
            message: "Reviews fetched successfully",
            data: reviews
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Reviews not found",
            error: error.message
        });
    }
}