import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

interface Product {
    _id: string;
    name: string;
    price: number;
    images: string[];
}

export default function MyProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const res = await axios.get<{ success: boolean; data: Product[] }>("/api/products/me");
            if (res.data.success) setProducts(res.data.data);
        } catch (err) {
            toast.error("Failed to fetch your products");
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id: string) => {
        try {
            await axios.delete(`/api/products/${id}`);
            toast.success("Product deleted");
            setProducts((prev) => prev.filter((p) => p._id !== id));
        } catch (err) {
            toast.error("Failed to delete product");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="max-w-4xl mx-auto mt-4 px-4 py-8">
            <div className="flex flex-col justify-center items-center gap-4">
                <h1 className="text-2xl font-heading text-center">My Products</h1>
                <Link
                    to="/products/create"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-500 transition"
                >
                    Create Product
                </Link>
            </div>

            {loading ? (
                <p className="text-center">Loading products...</p>
            ) : products.length === 0 ? (
                <p className="text-center text-gray-600">You haven't created any products yet.</p>
            ) : (
                <div className="flex flex-col gap-4 w-1/2 max-w-md p-6 bg-palette-primary text-palette-neutral shadow-highlight rounded-lg hover:shadow-xl transition-shadow duration-300 text-center gap-y-2 cursor-pointer hover:bg-palette-primary/90">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="bg-palette-secondary text-palette-neutral rounded-lg shadow-md overflow-hidden mx-auto my-4"
                        >
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                width={100}
                                className="object-cover"
                            />
                            <div className="p-4 flex flex-col gap-2">
                                <p className="text-lg font-semibold">{product.name}</p>
                                <p className="text-sm">₹{product.price}</p>
                                <button
                                    onClick={() => deleteProduct(product._id)}
                                    className="mt-2 bg-green-500 text-white py-1 px-3 rounded hover:bg-green-500 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
