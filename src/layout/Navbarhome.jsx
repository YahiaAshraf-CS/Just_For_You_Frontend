import React from "react";
import logo from "../assets/images/logoimg.jpeg";

import ButtonLight from "../components/buttons/ButtonLight";
import ButtonPink from "../components/buttons/ButtonPink";
import "../style/Navbar.css";
import { NavLink } from "react-router";

function Navbarhome() {
    return (
        <>
            {/* Header: 
         - Sticky to top of screen
         - White background with slight transparency (backdrop-blur)
         - Subtle bottom border and shadow
      */}
            <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-pink-100 shadow-sm transition-all duration-300">
                {/* Container: Centers content and provides padding */}
                <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
                    {/* Logo Section */}
                    <NavLink to="/" className="flex items-center gap-2 group">
                        <div className="w-12 h-12 p-1 bg-pink-50 rounded-xl border border-pink-100 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center overflow-hidden">
                            <img src={logo} alt="Logo" className="w-full rounded-bl-xl rounded-tr-xl h-full object-contain" />
                        </div>
                        {/* Optional: Title text if you want it next to the logo */}
                        <span className="text-xl font-bold text-gray-800 tracking-tight hidden sm:block group-hover:text-pink-600 transition-colors">
                            Just For <span className="text-pink-600">You</span>
                        </span>
                    </NavLink>

                    {/* Buttons Section */}
                    <div className="flex items-center gap-3 md:gap-4">
                        <div className="hidden sm:block">
                            <ButtonLight to="/auth">
                                <span>Login</span>
                            </ButtonLight>
                        </div>
                        {/* Mobile: Show Login as simple text or keep ButtonLight if space permits. 
                    Here we keep both buttons but ensure spacing. */}
                        <div className="sm:hidden">
                            <NavLink to="/auth" className="text-gray-600 font-bold mr-4 hover:text-pink-600">
                                Login
                            </NavLink>
                        </div>

                        <ButtonPink to="/sign">Sign up</ButtonPink>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Navbarhome;
