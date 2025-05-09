import { useEffect } from "react";
import { useCartContext } from "../../context/CartContext";
import { useUserContext } from "../../context/UserContext";
const API_URL = `${import.meta.env.VITE_API_URL}/api/cart`;
import { toast } from "react-toastify";
import axios from "axios";

export default function Cart() {
    const { loggedInUser } = useUserContext();
    const {
        cartItems,
        loading,
        loadCartItems,
        removeFromCart,
        clearCart,
    } = useCartContext();

    useEffect(() => {
        if (loggedInUser) {
            loadCartItems();
        }
    }, [loggedInUser]);

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const makeOrder = async () => {
        try {
            const orderData = {
                user: loggedInUser!._id,
                products: cartItems.map(item => ({
                  product: item.productId, // 👈 key fix here
                  quantity: item.quantity,
                })),
                totalAmount: totalPrice
              };
              
            await axios.post(`${API_URL}/`, orderData);

            toast.success("Order placed successfully!");
            clearCart();
            
        } catch (error) {
            console.error("Error placing order:", error);
            toast.error("Failed to place order. Please try again.");
        }
    };

    return (
        <div className="container mx-auto px-8">
            <h1 className="text-center font-heading text-3xl my-8">Your Cart</h1>

            {/* ⏳ Loading state */}
            {loading ? (
                <p className="text-center text-lg text-gray-600">Loading your cart...</p>
            ) : cartItems.length === 0 ? (
                <p className="text-center text-lg text-palette-highlight">Your cart is empty.</p>
            ) : (
                <>
                    {/* 🛒 Cart List */}
                    <div className="bg-palette-primary p-6 rounded-lg shadow-lg">
                        <ul className="divide-y divide-gray-200">
                            {cartItems.map((item) => (
                                <li
                                    key={item.productId}
                                    className="py-4 flex flex-col justify-center items-center gap-4"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        width={100}
                                        className="object-cover rounded-md shadow-md"
                                    />
                                    <div className="flex-1 text-center">
                                        <h2 className="text-lg font-bold">{item.name}</h2>
                                        <p className="text-sm text-palette-highlight">₹{item.price}</p>
                                        <p className="text-sm text-gray-700">
                                            Quantity: {item.quantity}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.productId)}
                                        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* 🧹 Clear Cart Button */}
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={clearCart}
                            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition mb-4"
                        >
                            Clear Cart
                        </button>
                    </div>

                    {/* 💰 Total Price & Order Button */}
                    <div className="flex justify-between items-center mt-6 bg-palette-primary p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold">Total: ₹{totalPrice}</h2>
                        <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition" onClick={makeOrder}>
                            Order Now
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
