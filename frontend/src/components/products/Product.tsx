import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Review {
    user: string; // Username or user ID
    rating: number; // Rating given by the user (e.g., 1 to 5)
    comment: string; // Review comment
    createdAt: string; // Date of the review (ISO string format)
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
    reviews: Review[];
    images: string[]; // Assuming a single image URL
}

export default function Product() {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState<Product>({
        _id: '',
        name: '',
        description: '',
        quantity: 0,
        reviews: [],
        unit: 0,
        price: 0,
        totalCount: 0,
        images: []
    });

    // Fetch product details by ID
    const fetchProduct = async () => {
        const response = await axios.get(`/api/products/${id}`); // Replace with your API endpoint
        setProduct(response.data.data); // Update state with product details
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    return (
        <div className="flex flex-col items-center gap-8 p-8 bg-palette-primary text-palette-highlight">
            {/* Product Name */}
            <h1 className="text-2xl font-bold">{product?.name}</h1>

            {/* Image Carousel */}
            <div className="w-full max-w-lg">
                <div className="relative overflow-hidden">
                    <div className="flex transition-transform">
                        {product?.images.map((image: string, index: number) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Product Image ${index + 1}`}
                                className="w-full object-cover"
                            />
                        ))}
                    </div>
                </div>
                {/* Add buttons for carousel navigation (if desired) */}
            </div>

            {/* Product Details */}
            <div className="text-center">
                <p className="text-lg">{product?.description}</p>
                <p className="text-xl font-bold mt-4">Price: ₹{product?.price}</p>
                <p className="text-lg mt-2">Quantity: {product?.quantity} {product?.unit}</p>
                <p className="text-lg mt-2">Total Count: {product?.totalCount}</p>
            </div>

            {/* Reviews Section */}
            {product?.reviews && product.reviews.length > 0 && (
                <div className="mt-8 w-full max-w-lg text-left">
                    <h2 className="text-xl font-bold">Reviews:</h2>
                    <ul className="list-disc pl-4">
                        {product.reviews.map((review, index) => (
                            <li key={index} className="mb-4">
                                <div className="font-semibold">{review.user}</div>
                                <div className="text-yellow-500">
                                    {/* Display the rating as stars (assuming 5-star rating system) */}
                                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                </div>
                                <div className="italic">{review.comment}</div>
                                <div className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

        </div>
    );
}
