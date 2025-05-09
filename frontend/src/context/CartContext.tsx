import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
    loadCartItems: () => Promise<void>;
    loading: boolean;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartContextProvider = ({ children }: CartProviderProps) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true); // 🟡 Add loading state

    const loadCartItems = async () => {
        setLoading(true); 
        try {
            const data = await axios.get<{ products: CartItem[] }>(`/api/cart/`);
            const res = data.data.products;

            if (res) {
                setCartItems(res);
                localStorage.setItem("cartItems", JSON.stringify(res)); // 🟢 Update localStorage
                toast.success("Cart items loaded successfully!");
            }
        } catch (error) {
            console.error("Error loading cart items:", error);
            toast.error("Failed to load cart items. Please try again.");
        } finally {  
            setLoading(false); 
        }
    };

    // 🔁 On mount: Load from localStorage first, then backend
    useEffect(() => {
        const storedCart = localStorage.getItem("cartItems");
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }

        loadCartItems(); // fetch from backend
    }, []);

    // 🧠 Every cart change → sync to localStorage
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = async (item: CartItem) => {
        try {
            await axios.post(`/api/cart`, {
                product: item.productId,
                quantity: item.quantity,
            });
            setCartItems(prev => [...prev, item]);
            toast.success(`${item.name} added to cart!`);
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("Failed to add item to cart. Please try again.");
        }
    };

    const removeFromCart = async (productId: string) => {
        try {
            await axios.delete(`/api/cart/${productId}`);
            setCartItems(prev => prev.filter(item => item.productId !== productId));
            toast.success(`Item removed from cart!`);
        } catch (error) {
            console.error("Error removing from cart:", error);
            toast.error("Failed to remove item from cart. Please try again.");
        }
    };

    const clearCart = async () => {
        try {
            await axios.delete(`/api/cart/clear/`);
            setCartItems([]);
            localStorage.removeItem("cartItems"); // 🗑 clear localStorage too
            toast.success("Cart cleared!");
        } catch (error) {
            console.error("Error clearing cart:", error);
            toast.error("Failed to clear cart. Please try again.");
        }
    };

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, clearCart, loadCartItems, loading }}
        >
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
