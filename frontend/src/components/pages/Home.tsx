import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import CallToAction from "../../utilities/CallToAction";

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    images: string[]; // Assuming a single image URL
}

export default function Home() {
    const [randomProducts, setRandomProducts] = useState<Product[]>([]);

    // Fetch random products from the server
    const fetchRandomProducts = async () => {
        try {
            const response = await axios.get<any>(`/api/products/random`);
            if (response.data.success) {
                setRandomProducts(response.data.data); // Assuming `data` is an array of 10 random products
            } else {
                throw new Error(response.data.error);
            }
        } catch (error) {
            console.error("Error fetching random products:", error);
        }
    };

    useEffect(() => {
        fetchRandomProducts(); // Fetch random products on page load
    }, []);

    return (
        <div>
            <CallToAction />
            {/* Section Title */}
            <h1 className="text-center font-heading text-3xl my-8">Featured Products</h1>

            {/* Grid for Random Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {randomProducts.map((product) => (
                    <div
                        key={product._id}
                        className="p-4 bg-palette-primary text-palette-neutral shadow-highlight rounded-lg hover:shadow-xl transition-shadow duration-300 flex flex-col gap-y-2"
                    >
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <h2 className="text-lg font-bold mb-2 line-clamp-1">{product.name}</h2>
                        <p className="text-sm text-palette-highlight mb-4 line-clamp-1">{product.description}</p>
                        <p className="text-lg font-semibold">₹{product.price}</p>
                        <Link
                            to={`/products/${product._id}`} // Ensure `product._id` holds the product's unique ID
                            className="mt-4 bg-palette-highlight text-palette-accent px-4 py-2 rounded hover:bg-palette-accent-dark transition"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
