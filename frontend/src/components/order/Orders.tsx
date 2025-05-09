import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export interface Order {
    _id: string;
    createdAt: string;
    // You can add more fields here if needed (e.g., status, amount, items)
}

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get<any>("/api/orders");
            if (response.data.success) {
                setOrders(response.data.data); // Assuming this is an array of orders
                toast.success("Orders fetched successfully!");
            } else {
                throw new Error(response.data.error || "Failed to fetch orders.");
            }
        } catch (error) {
            toast.error("Error fetching orders. Please try again.");
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div>
            <h1 className="text-center font-heading text-3xl my-8">Orders</h1>
            <div className="flex flex-col items-center gap-6 px-4 mb-4">
                {orders.map((order) => (
                    <Link
                        to={`/orders/${order._id}`}
                        key={order._id}
                        className="w-1/2 max-w-md p-6 bg-palette-primary text-palette-neutral shadow-highlight rounded-lg hover:shadow-xl transition-shadow duration-300 flex flex-col text-center gap-y-2 cursor-pointer hover:bg-palette-primary/90"
                    >
                        <h2 className="text-lg font-semibold">
                            Order ID: {order._id}
                        </h2>
                        <p className="text-sm text-palette-highlight">
                            Date: {new Date(order.createdAt).toLocaleString()}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );

}
