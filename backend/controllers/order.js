import Order from "../models/order.js";

export const createOrder = async (req, res) => {
    try {
        const { user, products, totalAmount } = req.body;
        const order = new Order({ user, products, totalAmount });
        await order.save();

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: order
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate("products.product");
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: orders
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("products.product");
        res.status(200).json({ success: true, message: "Order fetched successfully", data: order });
    } catch (error) {
        res.status(404).json({ success: false, message: "Order not found", error: error.message });
    }
};