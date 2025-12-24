import React, { useEffect, useState } from "react";
import { FaHeart, FaTrash, FaShoppingCart } from "react-icons/fa";
import Footer from "../layout/Footer";
import NavbarUser from "../layout/NavbarUser";

function Wishlist() {
    //https://justforyoubackend-production.up.railway.app/api
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const [wishlistItems, setWishlistItems] = useState([]);
    const api = "https://justforyoubackend-production.up.railway.app/api";
    const user_id = currentUser.id;

    useEffect(() => {
        get_wishlist();
    }, []);

    const get_wishlist = async () => {
        const response = await fetch(`${api}/wishlist/${user_id}`);
        const data = await response.json();
        setWishlistItems(data);
    };

    const remove_from_wishlist = async (wishlist_id) => {
        const response = await fetch(`${api}/wishlist/${wishlist_id}`, {
            method: "DELETE",
        });
        if (response.ok) {
            get_wishlist();
        }
    };

    const add_to_cart = async (product_id) => {
        const response = await fetch(`https://justforyoubackend-production.up.railway.app/api/cart`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id, product_id, quantity: 1 }),
        });

        if (response.ok) {
            alert("item moved to your cart");
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
            <NavbarUser />

            {/* Main Content Area */}
            <div className="flex-grow container mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 flex items-center justify-center gap-3 mb-2">
                        <FaHeart className="text-pink-600" />
                        <span>My Wishlist</span>
                    </h1>
                    <p className="text-gray-500">Manage your saved items</p>
                </div>

                {wishlistItems.length === 0 ? (
                    // Empty State Design
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
                        <div className="bg-pink-50 p-6 rounded-full mb-6">
                            <FaHeart size={48} className="text-pink-300" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
                        <p className="text-gray-500">Seems like you haven't found anything you like yet.</p>
                    </div>
                ) : (
                    // Product Grid Dashboard Style
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlistItems.map((item) => (
                            <div
                                key={item.wishlist_id}
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col relative">
                                {/* Floating Delete Button */}
                                <button
                                    onClick={() => remove_from_wishlist(item.wishlist_id)}
                                    className="absolute top-3 cursor-pointer right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-400 shadow-sm hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                                    title="Remove from wishlist">
                                    <FaTrash size={16} />
                                </button>

                                {/* Image Section */}
                                <div className="relative aspect-square overflow-hidden bg-gray-100">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                                        <p className="text-white text-xs font-bold uppercase tracking-wider">{item.category}</p>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-5 flex flex-col flex-grow">
                                    <div className="mb-4">
                                        <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-1 mb-1">{item.name}</h3>
                                        <p className="text-xl font-bold text-pink-600">${item.price} EGP</p>
                                    </div>

                                    {/* Action Button */}
                                    <button
                                        onClick={() => add_to_cart(item.product_id, item.wishlist_id)}
                                        className="mt-auto w-full cursor-pointer bg-pink-600 text-white py-3 px-4 rounded-xl font-semibold shadow-md shadow-pink-200 hover:bg-pink-700 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2">
                                        <FaShoppingCart size={18} />
                                        <span>Move to Cart</span>
                                    </button>
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

export default Wishlist;
