import Product from '../models/product.js';

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: product
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Product not found",
            error: error.message
        });
    }
}

export const postProduct = async (req, res) => {
    try {
        const { name, description, price, quantity, unit, totalCount, images, user } = req.body;

        const product = new Product({
            name, description, price, images, user, unit, totalCount, quantity
        });
        await product.save();

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}

export const getProducts = async (req, res) => {
    try {
        // Logic to fetch products from the database (e.g., using a model)
        const products = await Product.find();

        // Formulated response for success
        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: products
        });
    } catch (error) {
        // Formulated response for error
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message // Optional: include error details for debugging
        });
    }
};
