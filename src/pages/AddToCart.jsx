import NavbarUser from "../layout/NavbarUser";
import Footer from "../layout/Footer";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaTrash, FaArrowRight } from "react-icons/fa";

const AddToCart = () => {
    const api = "http://127.0.0.1:5000/api/shop";
    const [cartlist, setCartlist] = useState([]);

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const user_id = currentUser.id;

    useEffect(() => {
        get_cart();
    }, []);

    const get_cart = async () => {
        const response = await fetch(`${api}/cart/${user_id}`);
        const data = await response.json();
        setCartlist(data);
    };

    const remove_from_cart = async (cart_id) => {
        const response = await fetch(`${api}/cart/${cart_id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            get_cart();
        }
    };

    // حساب الإجمالي
    const total = cartlist.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
            <NavbarUser />

            <div className="flex-grow container mx-auto px-4 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                        <span className="bg-pink-100 text-pink-600 p-3 rounded-xl">
                            <FaShoppingCart size={24} />
                        </span>
                        Your Shopping Cart
                    </h1>
                    <p className="text-gray-500 mt-2 ml-1">
                        You have {cartlist.length} {cartlist.length === 1 ? "item" : "items"} in your cart
                    </p>
                </div>

                {cartlist.length === 0 ? (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100 text-center">
                        <div className="bg-gray-50 p-6 rounded-full mb-6">
                            <FaShoppingCart size={48} className="text-gray-300" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
                    </div>
                ) : (
                    /* Cart Grid Layout */
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* LEFT COLUMN: Cart Items */}
                        <div className="flex-grow lg:w-2/3">
                            <div className="space-y-4">
                                {cartlist.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 flex flex-col sm:flex-row items-center gap-6">
                                        {/* Product Image */}
                                        <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-grow text-center sm:text-left w-full">
                                            <div className="flex flex-col sm:flex-row justify-between items-start">
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name ? item.name : "Unnamed Product"}</h3>
                                                    <p className="text-sm text-gray-500 line-clamp-2 mb-2">{item.description}</p>
                                                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Quantity: {item.quantity}</div>
                                                </div>

                                                {/* Price */}
                                                <div className="mt-4 sm:mt-0 text-xl font-bold text-pink-600">
                                                    ${item.price} <span className="text-xs text-gray-500 font-normal">SAR</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Delete Action */}
                                        <button
                                            onClick={() => remove_from_cart(item.id)}
                                            className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                                            title="Remove Item">
                                            <FaTrash size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Order Summary */}
                        <div className="lg:w-1/3">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Order Summary</h2>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>${total} SAR</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span className="text-green-600 text-sm font-medium">Free</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center border-t border-gray-100 pt-4 mb-6">
                                    <span className="text-lg font-bold text-gray-900">Total</span>
                                    <span className="text-2xl font-bold text-pink-600">
                                        ${total} <span className="text-sm text-gray-500">SAR</span>
                                    </span>
                                </div>

                                {/* Placeholder Checkout Button (Visual Only as per instructions) */}
                                <button className="w-full bg-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-pink-700 hover:shadow-lg shadow-pink-200 transition-all duration-200 flex justify-center items-center gap-2">
                                    Checkout Now <FaArrowRight size={16} />
                                </button>

                                <p className="text-xs text-gray-400 text-center mt-4">Taxes calculated at checkout</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default AddToCart;
