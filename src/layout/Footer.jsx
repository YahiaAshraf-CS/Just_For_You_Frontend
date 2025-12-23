import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import logoimg from "../assets/images/logoimg.jpeg";
import { FaFacebook, FaInstagram, FaTelegramPlane } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";
import "../style/Footer.css";
import Linkicon from "../components/links/Linkicon";

function Footer() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        setCurrentUser(user);
    }, []);

    return (
        <footer className="w-full bg-slate-800 text-slate-300 py-12 mt-auto border-t border-slate-800">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-pink-600 shadow-lg shadow-pink-900/20">
                            <img className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" src={logoimg} alt="Logo" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white tracking-wide">Just For You</h3>
                            <p className="text-sm text-slate-500">Premium Shopping Experience</p>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <ul className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm font-medium">
                        <li className="hover:text-pink-500 transition-colors">
                            <Linkicon to="/">Home</Linkicon>
                        </li>
                        <li className="hover:text-pink-500 transition-colors">{currentUser != null ? <Linkicon to="/product">Products</Linkicon> : <Linkicon to="/sign">Sign up</Linkicon>}</li>
                        <li className="hover:text-pink-500 transition-colors">{currentUser != null ? <Linkicon to="/wish">Wishlist</Linkicon> : <Linkicon to="/auth">Login</Linkicon>}</li>
                        <li className="hover:text-pink-500 transition-colors">{currentUser != null ? <Linkicon to="/cart">Cart</Linkicon> : ""}</li>
                    </ul>

                    {/* Social Media Icons */}
                    <div className="flex items-center gap-4">
                        <NavLink
                            to={"https://www.facebook.com/share/1FV7p9HRC9/"}
                            className="bg-slate-800 p-2.5 rounded-xl text-white hover:bg-blue-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <FaFacebook size={20} />
                        </NavLink>

                        <NavLink
                            to={"https://chat.whatsapp.com/D3hnzXbYPeL0ZPPN37g6JN?mode=ems_copy_t_invite&app_absent=0"}
                            className="bg-slate-800 p-2.5 rounded-xl text-white hover:bg-green-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <IoLogoWhatsapp size={20} />
                        </NavLink>

                        <NavLink to={""} className="bg-slate-800 p-2.5 rounded-xl text-white hover:bg-pink-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <FaInstagram size={20} />
                        </NavLink>

                        <NavLink
                            to={"https://t.me/+iYwYMNCpxkQ1NjA0"}
                            className="bg-slate-800 p-2.5 rounded-xl text-white hover:bg-sky-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <FaTelegramPlane size={20} />
                        </NavLink>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-slate-800 my-8"></div>

                {/* Copyright Section */}
                <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
                    <p className="text-center md:text-left">
                        Copyright &copy; 2025 <span className="text-pink-600 text-xl font-bold"> Just For You </span>. All rights reserved.
                    </p>
                    <div className="flex gap-4 mt-2 md:mt-0">
                        <span className="cursor-pointer hover:text-slate-900">Privacy Policy</span>
                        <span className="cursor-pointer hover:text-slate-900">Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
