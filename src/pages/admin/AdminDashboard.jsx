import React from "react";
import ButtonPink from "../../components/buttons/ButtonPink";
import { useState, useEffect } from "react";
import NavbarUser from "../../layout/NavbarUser";
import { NavLink } from "react-router";
import { Outlet } from "react-router";
import Footer from "../../layout/Footer";
import { FaUserLarge } from "react-icons/fa6";
import { MdRemoveShoppingCart } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";
// import { MdDelete } from "react-icons/md";
import ViewOrders from "./ViewOrdersAdmin";
import { MdDashboard } from "react-icons/md"; // Added for visual polish (optional)

function AdminDashboard() {
    // let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        setCurrentUser(user);
    }, []);
    // http://127.0.0.1:5000/api/admin/api/products
    // http://127.0.0.1:5000/api/shop/products

    return (
        <div className="flex flex-col w-full min-h-screen bg-gray-50">
            <NavbarUser />

            {/* Main Dashboard Wrapper */}
            <div className="flex-grow container  w-full mx-auto min-h-screen px-2 py-5">
                <div className="flex  w-full justify-between flex-col lg:flex-row gap-8">
                    {/* LEFT SIDEBAR: Admin Controls */}
                    <aside className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5.5 flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
                            <div className="mb-6 pb-4 border-b border-gray-100">
                                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">Admin Panel</h2>
                                <p className="text-xs text-gray-500 mt-1">Manage Store & Users</p>
                            </div>

                            <nav className="flex flex-col items-center justify-center gap-3">
                                {/* Wrapped buttons to ensure they stretch or align properly in sidebar */}
                                <div className="w-full">
                                    <ButtonPink to="add_product">
                                        <div className="flex items-center justify-center w-full">
                                            <MdAddShoppingCart className="mr-2" size={18} /> Add Product
                                        </div>
                                    </ButtonPink>
                                </div>

                                

                                <div className="w-full">
                                    <ButtonPink to="view_users">
                                        <div className="flex items-center justify-center w-full">
                                            <FaUserLarge className="mr-2" size={18} /> View Users
                                        </div>
                                    </ButtonPink>

                                </div>

                                <div className="w-full">
                                    <ButtonPink to="view_orders">
                                        <div className="flex items-center justify-center w-full">
                                            <MdDashboard className="mr-2" size={18} /> View Orders
                                        </div>
                                    </ButtonPink>
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-100 w-full">
                                    <ButtonPink to="/admin">Back to Home</ButtonPink>
                                </div>
                            </nav>
                        </div>
                    </aside>

                    {/* RIGHT MAIN CONTENT: Workspace */}
                    <main className="w-full lg:w-3/4 xl:w-4/5">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[600px] p-8">
                            {/* Header Section */}
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold text-gray-800">
                                    Welcome back, <span className="text-pink-600 capitalize">{currentUser && currentUser.firstName}</span>
                                </h1>
                                <p className="text-gray-500 mt-2">Here is what's happening with your store today.</p>
                            </div>

                            {/* Content Area (Outlet) */}
                            <div className="bg-gray-50 rounded-lg p-4 w-full border border-gray-100">
                                <Outlet />
                            </div>
                        </div>
                    </main>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default AdminDashboard;
