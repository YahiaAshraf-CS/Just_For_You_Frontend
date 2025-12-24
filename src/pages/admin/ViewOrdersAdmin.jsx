import React, { useEffect, useState } from "react";
import { FaEnvelope, FaTrash, FaCheckCircle, FaBox } from "react-icons/fa";

function ViewOrdersAdmin() {
    const [orders, setOrders] = useState([]);
    const api = "https://justforyoubackend-production.up.railway.app/api/admin/orders";

    const get_orders = async () => {
        try {
            const response = await fetch(`${api}`);
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    
    useEffect(() => {
        get_orders();
    }, []);

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Total Orders: <span className="font-bold text-pink-600">{orders.length}</span>
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full whitespace-nowrap text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                <th className="px-6 py-4">Order Details</th>
                                <th className="px-6 py-4">Contact (Product)</th>
                                <th className="px-6 py-4 text-center"> user</th>


                                <th className="px-6 py-4 text-center"> Date</th>
    <th className="px-6 py-4 text-center"> Quantity</th>
                                <th className="px-6 py-4 text-center">price</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-150 group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold">
                                                {order.product_name ? order.product_name.charAt(0).toUpperCase() : "O"}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800 text-sm">Customer</p>
                                                <p className="text-xs text-gray-400">Order ID: {order.id}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <FaEnvelope className="text-gray-400" />
                                            {order.product_name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="font-bold text-gray-800 text-sm">{order.user_name}</span>
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <span className="font-bold text-gray-800 text-sm">{order.order_date}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="font-bold text-gray-800 text-sm">{order.quantity}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="font-bold text-gray-800 text-sm">${order.total_price}</span>
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200 uppercase tracking-tight">
                                            Panded
                                        </span>
                                    </td>

                                   
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {orders.length === 0 && <div className="p-8 text-center text-gray-500">No orders found.</div>}
            </div>
        </div>
    );
}

export default ViewOrdersAdmin;
