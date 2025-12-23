import React, { useState, useEffect } from "react";
import NavbarUser from "../layout/NavbarUser";
import Footer from "../layout/Footer";
import { FaClipboardList, FaCalendarAlt, FaBox, FaArrowRight, FaCheckCircle } from "react-icons/fa";

function ViewOrders() {
   const [orders, setOrders] = useState([]);

  
   const api = "http://127.0.0.1:5000/api/orders/";

   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
   const user_id = currentUser?.id;

   useEffect(() => {
       if (user_id) {
           get_orders();
       }
   }, [user_id]);

   const get_orders = async () => {
       try {
          
           const response = await fetch(`${api}${user_id}`);

           if (response.ok) {
               const data = await response.json();

               
               setOrders(data);
           } else {
               console.error("Failed to fetch orders");
           }
       } catch (error) {
           console.error("Error fetching orders:", error);
       }
   };
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
            <NavbarUser />

            <div className="flex-grow container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                        <span className="bg-pink-100 text-pink-600 p-3 rounded-xl">
                            <FaClipboardList size={24} />
                        </span>
                        Orders
                    </h1>
                    <p className="text-gray-500 mt-2 ml-1">
                        You have placed {orders.length} {orders.length === 1 ? "order" : "orders"} in total
                    </p>
                </div>

                {orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100 text-center">
                        <div className="bg-gray-50 p-6 rounded-full mb-6">
                            <FaClipboardList size={48} className="text-gray-300" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">No orders yet</h2>
                        <p className="text-gray-500 mb-8">Once you buy something, your orders will appear here.</p>
                    </div>
                ) : (
                    <div className="max-w-5xl mx-auto space-y-4">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                                <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                                    <div className="flex items-center gap-4 w-full sm:w-auto">
                                        <div className="h-14 w-14 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-xl">
                                            {order.product_name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="text-gray-900 font-bold text-lg">Order #{order.id}</div>
                                            <div className="text-sm text-gray-400 flex items-center gap-1">
                                                <FaCalendarAlt size={12} />
                                                {new Date(order.order_date).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-grow flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                                        <FaBox className="text-pink-300" size={18} />
                                        <div>
                                            <p className="text-sm font-bold text-gray-700">{order.product_name}</p>
                                            <p className="text-xs text-gray-500 font-medium">Quantity: {order.quantity}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center sm:items-end gap-2 w-full sm:w-auto">
                                        <div className="text-2xl font-black text-pink-600">
                                            ${order.total_price} <span className="text-xs text-gray-400 font-normal">SAR</span>
                                        </div>
                                        <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-50 text-green-600 border border-green-100">
                                            <FaCheckCircle size={10} /> Paid & Confirmed
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}

export default ViewOrders;
