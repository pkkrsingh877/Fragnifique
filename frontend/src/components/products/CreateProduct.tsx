import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;

interface Product {
    name: string;
    description: string;
    price: string;
    quantity: string;
    unit: 'ml' | 'g' | 'oz' | 'pcs';
    totalCount: number;
    images: string[]; // Now an array of strings for multiple image URLs
    reviews: string[];
    user: string;
}

export default function CreateProduct() {
    const [product, setProduct] = useState<Product>({
        name: '',
        description: '',
        price: '',
        quantity: '',
        unit: 'ml',
        totalCount: 0,
        images: [], // Initialize as an empty array
        reviews: [],
        user: '',
    });

    const { loggedInUser } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedInUser) {
            setProduct((prevProduct) => ({
                ...prevProduct,
                user: loggedInUser._id,
            }));
        }
    }, [loggedInUser]);

    const handleAddImageUrl = () => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            images: [...prevProduct.images, ''], // Add a new empty string for a new input field
        }));
    };

    const handleImageUrlChange = (index: number, value: string) => {
        const newImages = [...product.images];
        newImages[index] = value; // Update the specific index in the images array
        setProduct({ ...product, images: newImages });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post<any>(`/api/products`, product);
            if (response.data.success) {
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col justify-start p-16 gap-y-2 text-palette-accent bg-palette-neutral text-center">
            <h1 className="font-heading text-xl">Create Product</h1>
            <p>Already have an account? <Link to="/account/login">Login</Link></p>

            <div className="flex flex-col justify-center items-center gap-4">
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Product Name"
                    value={product.name}
                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                    className="bg-palette-neutral text-palette-accent border border-1 border-palette-accent p-4 outline-none"
                />
                <textarea
                    id="description"
                    name="description"
                    placeholder="Product Description"
                    value={product.description}
                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                    className="bg-palette-neutral text-palette-accent border border-1 border-palette-accent p-4 outline-none"
                />
                <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                    className="bg-palette-neutral text-palette-accent border border-1 border-palette-accent p-4 outline-none"
                />
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    placeholder="Quantity"
                    value={product.quantity}
                    onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
                    className="bg-palette-neutral text-palette-accent border border-1 border-palette-accent p-4 outline-none"
                />
                <select
                    id="unit"
                    name="unit"
                    value={product.unit}
                    onChange={(e) => setProduct({ ...product, unit: e.target.value as 'ml' | 'g' | 'oz' | 'pcs' })}
                    className="bg-palette-neutral text-palette-accent border border-1 border-palette-accent p-4 outline-none"
                >
                    <option value="ml">ml</option>
                    <option value="g">g</option>
                    <option value="oz">oz</option>
                    <option value="pcs">pcs</option>
                </select>
                <input
                    type="number"
                    id="totalCount"
                    name="totalCount"
                    placeholder="Total Count"
                    value={product.totalCount}
                    onChange={(e) => setProduct({ ...product, totalCount: Number(e.target.value) })}
                    className="bg-palette-neutral text-palette-accent border border-1 border-palette-accent p-4 outline-none"
                />

                {/* Dynamic Image URLs */}
                {product.images.map((image, index) => (
                    <input
                        key={index}
                        type="url"
                        placeholder={`Image URL ${index + 1}`}
                        value={image}
                        onChange={(e) => handleImageUrlChange(index, e.target.value)}
                        className="bg-palette-neutral text-palette-accent border border-1 border-palette-accent p-4 outline-none"
                    />
                ))}

                {/* Add Another Image Button */}
                <button
                    onClick={handleAddImageUrl}
                    className="bg-palette-accent text-palette-neutral p-2"
                >
                    Add Another Image
                </button>

                <button onClick={handleSubmit} className="bg-palette-accent text-palette-neutral p-4">
                    Create Product
                </button>
            </div>
            <hr className="w-full" />
        </div>
    );
}
