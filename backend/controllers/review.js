import Review from '../models/review.js';

export const postReview = async (req, res) => {
    try {
        const { product, user, rating, comment } = req.body;

        let existingReview = await Review.findOne({ product, user }).populate('user').select('-password -__v -isSeller -email');

        if (existingReview) {
            existingReview.rating = rating;
            existingReview.comment = comment;
            await existingReview.save();

            return res.status(200).json({
                success: true,
                message: "Review updated successfully",
                data: existingReview
            });
        } else {
            const review = new Review({
                user,
                rating,
                comment,
                product
            });
            await review.save();

            review = review.populate('user').select('-password -__v  -isSeller -email');

            return res.status(201).json({
                success: true,
                message: "Review posted successfully",
                data: review
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Review not posted",
            error: error.message
        });
    }
};

export const updateReview = async (req, res) => {
    try {
        const { product, user, rating, comment } = req.body;

        let existingReview = await Review.findOne({ product, user });

        if (existingReview) {
            existingReview.rating = rating;
            existingReview.comment = comment;
            await existingReview.save();

            existingReview = existingReview.populate('user').select('-password -__v -isSeller -email');

            return res.status(200).json({
                success: true,
                message: "Review updated successfully",
                data: existingReview
            });
        }
        return res.status(201).json({
            success: true,
            message: "Review updated successfully",
            data: review
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Review not posted",
            error: error.message
        });
    }
};
