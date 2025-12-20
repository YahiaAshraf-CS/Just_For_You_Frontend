import React from 'react'
import ButtonLight from "../components/buttons/ButtonLight";
import ButtonPink from "../components/buttons/ButtonPink";
import logo from "../assets/images/logoimg.jpeg"
import "../style/Navbar.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from 'react'; 
import { NavLink } from 'react-router-dom';
import { setIsLog } from '../../islog';
import { setIssigned } from '../../issigned';
import { FaShoppingCart } from "react-icons/fa";
 

function NavbarUser() {
    const navigate = useNavigate();
 // يطبع اسم المستخدم الحالي لو موجود
    const [currentUser, setCurrentUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);        

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        setCurrentUser(user);
    }, []);
    const handleLogOut = () => { 
        localStorage.removeItem("currentUser");
        setCurrentUser(null);
        if (window.location.pathname === "/product") {
            navigate("/");
        }
        else if (window.location.pathname === "/wish") {
            navigate("/");
        }
        else if (window.location.pathname === "/cart") {
            navigate("/");
        }
        else if (window.location.pathname === "/admin") {
            navigate("/");
        }
        else if (window.location.pathname === "/admin/add_product") {
            navigate("/");
        }
        else if (window.location.pathname === "/admin/remove_product") {
            navigate("/");
        }
        else if (window.location.pathname === "/admin/view_users") {
            navigate("/");
        }
            
        else if (window.location.pathname === "/") {
            // to stay on the same page and refresh the page
            navigate(0);
         }
        setIsLog(false);
        setIssigned(false);
    }

    const linkClass = "px-4 py-2 rounded-2xl  rounded-2xl cursor-pointer text-pink-500 hover:text-yellow-500 border-2 border-amber-400 bg-amber-400 hover:bg-transparent border-2  hover:bg-transparent  transition  ease-in-out duration-300 ";
    const linkClass1 = "px-4 py-2 rounded-2xl rounded-2xl cursor-pointer text-white hover:text-pink-600 border-2 border-[var(--color-prinky)] hover:bg-transparent bg-[var(--color-prinky)] transition ease-in-out duration-300";
    return (
        <>
            <nav className=" w-full h-fit  shadow-2xl shadow-pink-200 bg-pink-10 flex     items-center justify-between gap-6 md:justify-evenly md:gap-10 lg:justify-around xl:justify-between  min-w-full px-4 py-3 flex-wrap">
                <div className="logo w-fit h-fit px-2.5 flex justify-center items-center hover:drop-shadow-xl drop-shadow-md drop-shadow-pink-200 hover:drop-shadow-pink-500 hover:text-white gap-3 py-1.5 bg-[var(--color-prinky)] rounded-3xl shadow-sm mr-6 hover:bg-pink-800 cursor-pointer transition-all duration-300 ease-in-out hover:scale-3d">
                    <img src={logo} alt="" width={40} height={45} className=" rounded-tl-2xl rounded-br-2xl" />
                    <p className=" text-var[(--color-prinky)] text-2xl">hello {currentUser ? (currentUser.is_admin === true ? "Admin" : currentUser.firstName) : ""}</p>
                </div>
                {/* Right side (desktop) */}
                <div className="hidden  md:flex space-x-6">
                    <button onClick={() => navigate("/cart")}>
                        <FaShoppingCart
                            className={({ isActive }) =>
                                `  ${
                                    isActive ? "text-pink-600" : "text-amber-500"
                                } text-amber-500 hover:shadow-2xl hover:shadow-pink-300 hover:drop-shadow-xl drop-shadow-lg drop-shadow-amber-300 hover:inset-shadow-pink-500 hover:drop-shadow-pink-700  w-[23px] h-[23px] cursor-pointer hover:text-pink-600 transition-all duration-300 ease-in-out`
                            }
                        />
                    </button>
                    <NavLink to="/product" className={({ isActive }) => `${linkClass1} ${isActive ? "bg-pink-600 border-pink-500 text-white" : ""}`}>
                        Products
                    </NavLink>
                    <NavLink to="/wish" className={({ isActive }) => `${linkClass1} ${isActive ? "bg-pink-600 border-pink-500 text-white" : ""}`}>
                        Wishlist
                    </NavLink>
                    {currentUser && currentUser.is_admin === true && (
                        <NavLink to="/admin" className={({ isActive }) => `${linkClass1} ${isActive ? "bg-pink-600 border-pink-500 text-white" : ""}`}>
                            Admin
                        </NavLink>
                    )}
                    <button onClick={handleLogOut} className={linkClass}>
                        Logout
                    </button>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden gap-7 flex items-center justify-center">
                    <button onClick={() => navigate("/cart")}>
                        <FaShoppingCart
                            className={({ isActive }) =>
                                `${
                                    isActive ? "text-pink-600" : "text-amber-500"
                                } text-amber-500 hover:shadow-2xl hover:shadow-pink-300 hover:drop-shadow-xl drop-shadow-lg drop-shadow-amber-300 hover:inset-shadow-pink-500 hover:drop-shadow-pink-700  w-[23px] h-[23px] cursor-pointer hover:text-pink-600 transition-all duration-300 ease-in-out`
                            }
                        />
                    </button>
                    <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none cursor-pointer">
                        {isOpen ? "✖" : "☰"}
                    </button>
                </div>

                {/* Mobile dropdown */}
                {isOpen && (
                    <div className="md:hidden absolute rounded-2xl cursor-pointer right-0 top-[9%] w-48 bg-pink-200 px-4 pt-2 pb-3 space-y-2">
                        <NavLink to="/product" className={({ isActive }) => `${linkClass1} block flex justify-center items-center w-full text-left ${isActive ? "bg-pink-800" : ""}`}>
                            Products
                        </NavLink>
                        <NavLink to="/wish" className={({ isActive }) => `${linkClass1} block flex justify-center items-center w-full text-left ${isActive ? "bg-pink-800" : ""}`}>
                            Wishlist
                        </NavLink>
                        {currentUser && currentUser.is_admin === true && (
                            <NavLink to="/admin" className={({ isActive }) => `${linkClass1} block flex justify-center items-center w-full text-left ${isActive ? "bg-pink-800" : ""}`}>
                                Admin
                            </NavLink>
                        )}
                        <button onClick={handleLogOut} className={linkClass + "block flex justify-center items-center w-full text-left px-3 py-2  hover:bg-pink-800"}>
                            Logout
                        </button>
                    </div>
                )}
            </nav>
        </>
    );
}

export default NavbarUser

