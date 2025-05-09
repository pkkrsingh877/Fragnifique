import { useCartContext } from "../../context/CartContext";
import { useUserContext } from "../../context/UserContext";
export default function Cart() {
    const { loggedInUser } = useUserContext();
    if (!loggedInUser) {
        return (
            <div className="container mx-auto px-8">
                <h1 className="text-center font-heading text-3xl my-8">Your Cart</h1>
                <p className="text-center text-lg text-palette-highlight">Please log in to view your cart.</p>
            </div>
        );
    }

    const { cartItems, removeFromCart, clearCart } = useCartContext();
    // Calculate total price
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="container mx-auto px-8">
            <h1 className="text-center font-heading text-3xl my-8">Your Cart</h1>

            {cartItems.length === 0 ? (
                <p className="text-center text-lg text-palette-highlight">Your cart is empty.</p>
            ) : (
                <>
                    {/* Cart List */}
                    <div className="bg-palette-primary p-6 rounded-lg shadow-lg">
                        <ul className="divide-y divide-gray-200">
                            {cartItems.map((item) => (
                                <li key={item.productId} className="py-4 flex flex-col justify-center items-center gap-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        width={100}
                                        className="object-cover rounded-md shadow-md"
                                    />
                                    <div className="flex-1">
                                        <h2 className="text-lg font-bold">{item.name}</h2>
                                        <p className="text-sm text-palette-highlight">₹{item.price}</p>
                                        <p className="text-sm text-gray-700">Quantity: {item.quantity}</p>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.productId)}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Total Price & Order Button */}
                    <div className="flex justify-between items-center mt-6 bg-palette-primary p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold">Total: ₹{totalPrice}</h2>
                        <button
                            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
                        >
                            Order Now
                        </button>
                    </div>

                    {/* Clear Cart Button */}
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={clearCart}
                            className="bg-palette-highlight text-palette-accent px-6 py-2 rounded hover:bg-palette-accent-dark transition"
                        >
                            Clear Cart
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}