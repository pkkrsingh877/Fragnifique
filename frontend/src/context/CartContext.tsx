import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = "http://localhost:9999/api/cart"; // Adjust based on backend URL

interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartContextProvider = ({ children }: CartProviderProps) => {

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    // Load cart items on mount
    const loadCartItems = async () => {
        try {
            const data = await axios.get<{ products: CartItem[] }>(`${API_URL}/`)
            const res = await data.data.products;

            if (res) {
                setCartItems(res);
            }

            console.log("Cart items loaded:", cartItems);
            toast.success("Cart items loaded successfully!");

        } catch (error) {
            console.error("Error loading cart items:", error);
            toast.error("Failed to load cart items. Please try again.");
        }
    }
    useEffect(() => {
        loadCartItems();
    }, []); // Load cart items when user logs in

    // Add item to cart & save to DB
    const addToCart = async (item: CartItem) => {
        try {
            await axios.post(`${API_URL}/`, { product: item.productId, quantity: item.quantity });
            setCartItems(prev => [...prev, item]);
            toast.success(`${item.name} added to cart!`);
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("Failed to add item to cart. Please try again.");
        }
    };

    // Remove item from cart in DB
    const removeFromCart = async (productId: string) => {
        try {
            await axios.delete(`${API_URL}/${productId}`);
            setCartItems(prev => prev.filter(item => item.productId !== productId));
            toast.success(`Item removed from cart!`);
        } catch (error) {
            toast.error("Failed to remove item from cart. Please try again.");
            console.error("Error removing from cart:", error);
        }
    };

    // Clear cart in DB
    const clearCart = async () => {
        try {
            await axios.delete(`${API_URL}/clear/`);
            setCartItems([]);
            toast.success("Cart cleared!");
        } catch (error) {
            console.error("Error clearing cart:", error);
            toast.error("Failed to clear cart. Please try again.");
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("CartContextProvider is missing!");
    }
    return context;
};