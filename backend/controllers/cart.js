import Cart from "../models/cart.js";

export const addToCart = async (req, res) => {
    try {
        const { product, quantity } = req.body;
        const user = req.user.id;
        const cart = await Cart.findOne({ user });

        if (!cart) {
            const newCart = new Cart({ user, products: [{ product, quantity }] });
            await newCart.save();
            return res.status(201).json({ success: true, message: "Item added to cart", data: newCart });
        }

        // If cart exists, update quantity or add new product
        const existingProductIndex = cart.products.findIndex(p => p.product.toString() === product);
        if (existingProductIndex >= 0) {
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            cart.products.push({ product, quantity });
        }

        await cart.save();
        res.status(200).json({ success: true, message: "Cart updated", data: cart });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate("products.product");
        console.log(cart.products);
        res.status(200).json({ success: true, message: "Cart fetched successfully", data: cart });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        cart.products = cart.products.filter(p => p.product.toString() !== req.params.id);
        await cart.save();

        res.status(200).json({ success: true, message: "Item removed from cart", data: cart });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const clearCart =  async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        cart.products = [];
        await cart.save();

        res.status(200).json({ success: true, message: "Cart cleared", data: cart });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}