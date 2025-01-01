import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from '../../context/UserContext';

interface User {
    _id: string;
    name: string;
}

interface Review {
    _id: string;
    user: User;
    rating: number;
    comment: string;
    product: string;
    createdAt: string;
    updatedAt: string;
}

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    unit: number;
    totalCount: number;
    images: string[];
}

export default function Product() {
    const { id } = useParams(); // Get the product ID from the URL
    const { loggedInUser } = useUserContext();
    const [product, setProduct] = useState<Product>({
        _id: '',
        name: '',
        description: '',
        quantity: 0,
        unit: 0,
        price: 0,
        totalCount: 0,
        images: [],
    });
    const [reviews, setReviews] = useState<Review[]>([]); // Separate state for reviews
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const [existingReview, setExistingReview] = useState<Review | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Fetch product details by ID and fetch reviews separately
    const fetchProduct = async () => {
        try {
            const response = await axios.get(`/api/products/${id}`);
            setProduct(response.data.data.product);

            // Fetch reviews separately
            setReviews(response.data.data.reviews); // Set reviews state from response

            // Check if the logged-in user has already reviewed the product
            const userReview = response.data.data.reviews.find((review: Review) => review.user._id === loggedInUser?._id);
            setExistingReview(userReview || null);
            if (userReview) {
                setRating(userReview.rating);
                setComment(userReview.comment);
            }
        } catch (error) {
            console.error('Error fetching product', error);
        }
    };

    const handleSubmitReview = async () => {
        if (rating < 1 || rating > 5 || !comment.trim()) {
            alert('Please provide a valid rating (1 to 5) and a comment.');
            return;
        }

        setIsSubmitting(true);

        try {
            const reviewData = { rating, comment, product: id, user: loggedInUser?._id };
            let response;
            if (existingReview) {
                // Update the review if it already exists
                response = await axios.patch(`/api/reviews/${existingReview._id}`, reviewData);
            } else {
                // Create a new review if none exists
                response = await axios.post('/api/reviews', reviewData);
            }

            // Reset form after submission
            setRating(0);
            setComment('');
            setExistingReview(response.data.data); // Update the existing review state
            fetchProduct(); // Refresh the product data with updated reviews
        } catch (error) {
            console.error('Error submitting review', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id, loggedInUser]);

    return (
        <div className="flex flex-col items-center gap-8 p-8 bg-palette-primary text-palette-highlight">
            {/* Product Details */}
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <div className="w-50 max-w-lg">
                <div className="relative overflow-hidden">
                    <div className="flex transition-transform">
                        {product.images.map((image, index) => (
                            <img key={index} src={image} alt={`Product Image ${index + 1}`} className="w-full object-cover" />
                        ))}
                    </div>
                </div>
            </div>
            <p className="text-lg">{product.description}</p>
            <p className="text-xl font-bold mt-4">Price: ₹{product.price}</p>
            <p className="text-lg mt-2">Quantity: {product.quantity} {product.unit}</p>
            <p className="text-lg mt-2">Total Count: {product.totalCount}</p>

            {/* Reviews Section */}
            {reviews.length > 0 && (
                <div className="mt-8 w-full max-w-lg text-left">
                    <h2 className="text-3xl font-bold font-heading text-center">Reviews</h2>
                    <section className="mt-4">
                        {reviews.map((review, index) => (
                            <article key={index} className="mb-4 shadow-highlight p-4 rounded-md bg-palette-neutral text-palette-accent">
                                <div className="font-semibold">{review.user.name}</div>
                                <div className="text-yellow-500">
                                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                </div>
                                <div className="italic">{review.comment}</div>
                                <div className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</div>
                            </article>
                        ))}
                    </section>
                </div>
            )}

            {/* Add or Edit Review Form */}
            <div className="mt-8 w-full max-w-lg bg-palette-neutral text-palette-accent p-4 rounded-md shadow-highlight">
                <h3 className="text-xl font-bold">{existingReview ? 'Edit Your Review' : 'Add a Review'}</h3>
                <div className="flex flex-col gap-4 mt-4">
                    <div>
                        <label className="block text-lg">Rating</label>
                        <input
                            type="number"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            min={1}
                            max={5}
                            className="w-full p-2 border text-palette-neutral"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg">Comment</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={4}
                            className="w-full p-2 border text-palette-neutral"
                            required
                        />
                    </div>
                    <button
                        onClick={handleSubmitReview}
                        className="bg-palette-primary text-palette-neutral py-2 mt-4"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                </div>
            </div>
        </div>
    );
}
