import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable"; // Import the jsPDF autoTable plugin

interface ProductInOrder {
    product: {
        _id: string;
        name: string;
        price: number;
        images: string[];
    };
    quantity: number;
}

interface Order {
    _id: string;
    status: string;
    totalAmount: number;
    createdAt: string;
    products: ProductInOrder[];
}

export default function OrderPage() {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const orderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get<{ success: boolean; data: Order }>(`/api/orders/${id}`);
                if (response.data.success) {
                    setOrder(response.data.data);
                    toast.success("Order details fetched successfully!");
                }
            } catch (error) {
                console.error("Failed to fetch order", error);
                toast.error("Error fetching order details. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    const downloadPDF = (order: Order) => {
        const doc = new jsPDF();

        // Set a font that supports Unicode (Arial or similar fonts)
        doc.setFont('helvetica', 'normal');

        // Title
        doc.setFontSize(24);
        doc.text('Fragnifique', 20, 20);

        // Subtitle
        doc.setFontSize(16);
        doc.text('Order Details', 20, 35); // Moved further down

        // Order Details
        const createdAt = order.createdAt ?? '';
        doc.setFontSize(12);
        doc.text(`Order ID: ${order._id}`, 20, 50);
        doc.text(`Status: ${order.status}`, 20, 60);
        doc.text(`Total Amount: ${order.totalAmount}`, 20, 70);
        doc.text(`Ordered On: ${new Date(createdAt).toLocaleString()}`, 20, 80);

        // Table
        const tableData = order.products.map((item) => [
            `${item.product.name.slice(0, 20)}...`,
            `${item.product.price}`,
            `${item.quantity}`,
            `${item.product.price * item.quantity}`,
        ]);

        autoTable(doc, {
            startY: 90, // Move table further down
            head: [['Product Name', 'Price', 'Quantity', 'Subtotal']],
            body: tableData,
        });

        // Save
        doc.save(`order-${order._id}.pdf`);
    };


    if (loading) {
        return <p className="text-center mt-10 text-lg">Loading order details...</p>;
    }

    if (!order) {
        return <p className="text-center mt-10 text-lg text-red-500">Order not found.</p>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8" ref={orderRef}>
            <h1 className="text-2xl font-heading mb-6 mt-4 text-center">Order Details</h1>

            {/* Order Summary Section */}
            <div className="bg-palette-primary text-palette-neutral p-6 rounded-lg shadow-md mb-8 space-y-2">
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                <p><strong>Ordered On:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            </div>

            {/* Items in this Order */}
            <h2 className="text-xl font-semibold mb-4 text-center">Items</h2>
            <div className="w-1/2 flex flex-col gap-6">
                {order.products.map((item, index) => (
                    <div
                        key={index}
                        className="w-full flex flex-col items-center justify-center max-w-md mx-auto mb-4 bg-palette-secondary text-palette-neutral rounded-lg shadow-lg overflow-hidden"
                    >
                        <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            width={100}
                            className="object-cover rounded-t"
                        />
                        <div className="p-4 flex flex-col gap-2">
                            <p className="text-lg font-bold">{item.product.name}</p>
                            <p className="text-sm text-palette-highlight">₹{item.product.price} × {item.quantity}</p>
                            <p className="text-sm font-semibold">Subtotal: ₹{item.product.price * item.quantity}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Download PDF Button */}
            <div className="mb-4 flex justify-center gap-4">
                <Link
                    to="/orders"
                    className="bg-palette-highlight text-palette-accent px-4 py-2 rounded hover:bg-palette-accent-dark transition"
                >
                    ← Back to Orders
                </Link>
                <button
                    onClick={() => order && downloadPDF(order)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                    ⬇ Download PDF
                </button>
            </div>
        </div>
    );
}

