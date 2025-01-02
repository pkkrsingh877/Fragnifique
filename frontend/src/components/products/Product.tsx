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

    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    // Fetch product details by ID and fetch reviews separately
    const fetchProduct = async () => {
        try {
            const response = await axios.get<any>(`/api/products/${id}`);
            setProduct(response.data.data.product);

            // Fetch reviews separately
            setReviews(response.data.data.reviews); // Set reviews state from response

            // Check if the logged-in user has already reviewed the product
            const userReview = response.data.data.reviews.find(
                (review: Review) => review.user._id === loggedInUser?._id
            );
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
                response = await axios.patch<any>(`/api/reviews/${existingReview._id}`, reviewData);
            } else {
                // Create a new review if none exists
                response = await axios.post<any>('/api/reviews', reviewData);
            }

            // Reset form after submission
            setRating(0);
            setComment('');
            setExistingReview(response.data.data as Review); // Update the existing review state
            fetchProduct(); // Refresh the product data with updated reviews
        } catch (error) {
            console.error('Error submitting review', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleNextImage = () => {
        if (currentImageIndex < product.images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        } else {
            setCurrentImageIndex(0); // Loop back to first image
        }
    };

    const handlePrevImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        } else {
            setCurrentImageIndex(product.images.length - 1); // Loop back to last image
        }
    };

    const handleShare = (platform: string) => {
        const productUrl = `${window.location.origin}/products/${product._id}`;
        const message = `Check out this product: ${product.name} - ${productUrl}`;
        switch (platform) {
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(product.name)}`, '_blank');
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id, loggedInUser]);

    return (
        <div className="flex flex-col items-center gap-8 p-8 bg-palette-primary text-palette-highlight">
            {/* Product Details Card */}
            <div className="max-w-4xl w-full p-6 bg-palette-primary shadow-highlight rounded-lg hover:shadow-xl transition-shadow duration-300">
                <h1 className="text-3xl font-heading text-palette-neutral mb-6">{product.name}</h1>

                {/* Carousel Section */}
                <section className="mt-6 relative w-full overflow-hidden">
                    <div className="flex transition-transform" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
                        {product.images.map((image, index) => (
                            <div key={index} className="w-full flex-shrink-0">
                                <img
                                    src={image}
                                    alt={`Product Image ${index + 1}`}
                                    className="w-full h-96 object-cover rounded-lg"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Left and Right Buttons for Carousel */}
                    <button
                        onClick={handlePrevImage}
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-lg hover:bg-palette-highlight transition duration-300"
                    >
                        &#8592;
                    </button>
                    <button
                        onClick={handleNextImage}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-lg hover:bg-palette-highlight transition duration-300"
                    >
                        &#8594;
                    </button>
                </section>

                {/* Product Description */}
                <p className="text-lg text-palette-highlight mt-4">{product.description}</p>
                <p className="text-xl font-bold text-palette-neutral mt-4">₹{product.price}</p>
                <p className="text-lg text-palette-highlight mt-2">{product.quantity} {product.unit}</p>
                {
                    product.totalCount <= 100 ? (
                        <>
                            <p className="text-lg text-palette-highlight mt-2">Hurry! Only {product.totalCount} left</p>
                        </>
                    ) : (
                        <>
                            <p className="text-lg text-palette-highlight mt-2">In Stock: {product.totalCount} </p>
                        </>
                    )
                }

                {/* Share Buttons */}
                <div className="mt-4 flex space-x-4">
                    <button onClick={() => handleShare('whatsapp')} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                        Share on WhatsApp
                    </button>
                    <button onClick={() => handleShare('twitter')} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        Share on Twitter
                    </button>
                </div>
            </div>

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
