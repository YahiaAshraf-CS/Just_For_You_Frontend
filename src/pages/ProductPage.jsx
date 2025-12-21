import React, { useEffect, useState } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import Footer from "../layout/Footer";
import ButtonPink from "../components/buttons/ButtonPink"; // Keeping import, though not used in new layout to keep logic safe
import NavbarUser from "../layout/NavbarUser";

const ProductPage = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/shop/products")
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);

    const filterCategory = (cat) => {
        if (cat === "all") {
            setFilteredProducts(products);
        } else {
            const result = products.filter((item) => item.category === cat);
            setFilteredProducts(result);
        }
    };

    const handleAddToWishlist = async (product) => {
        const response = await fetch("http://127.0.0.1:5000/api/shop/api/wishlist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: currentUser.id,
                product_id: product.id,
            }),
        });

        const data = await response.json();
        if (data.status === "error") {
            alert(data.message);
            return;
        }
        if (data.message === "Product already in wishlist") {
            alert("Product already in wishlist");
            return;
        }

        alert("Added to wishlist");
    };

    const handleAddTocartlist = async (product) => {
        const response = await fetch("http://127.0.0.1:5000/api/shop/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: currentUser.id,
                product_id: product.id,
                quantity: 1,
            }),
        });
        const data = await response.json();
        if (data.status === "error") {
            alert(data.message);
            return;
        }
        // check if stock is 0
        if (data.stock === 0) {
            alert("Product out of stock");
            return;
        }

        alert("Added to cart");
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
            <NavbarUser />

            <div className="flex-grow container mx-auto px-4 py-8">
                {/* Admin Welcome Banner */}
                {currentUser && currentUser.is_admin === true && (
                    <div className="mb-8 p-4 bg-white border-l-4 border-pink-600 rounded-r-lg shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-pink-600 uppercase tracking-wide">Admin Mode</p>
                            <h1 className="text-xl font-bold text-gray-800">Welcome, {currentUser.firstName}</h1>
                        </div>
                        <span className="px-3 py-1 bg-pink-100 text-pink-700 text-xs font-bold rounded-full">Dashboard View</span>
                    </div>
                )}

                {/* Page Header */}
                <div className="text-center mb-10">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-2">Our Collection</h2>
                    <p className="text-gray-500">Browse our latest products and accessories</p>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {["perfume", "makeup", "accessories", "toys"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => filterCategory(cat)}
                            className="px-6 py-2.5 cursor-pointer rounded-2xl bg-white border border-gray-200 text-gray-600 font-medium hover:bg-pink-50 hover:border-pink-200 hover:text-pink-600 transition-all duration-200 shadow-sm capitalize">
                            {cat}
                        </button>
                    ))}
                    <button onClick={() => filterCategory("all")} className="px-6 py-2.5 rounded-2xl cursor-pointer bg-gray-800 text-white font-medium hover:bg-gray-900 transition-all duration-200 shadow-md">
                        All Categories
                    </button>
                </div>

                {/* Product Grid */}
                <div className="min-h-[400px]">
                    {products && products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                                    {/* Product Image */}
                                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        {/* Badge for Stock Status */}
                                        {product.stock <= 0 && <div className="absolute top-3 right-3 bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full">Sold Out</div>}
                                    </div>

                                    {/* Product Details */}
                                    <div className="p-5 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                                            <span className="text-pink-600 font-bold whitespace-nowrap">{product.price} SAR</span>
                                        </div>

                                        <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">{product.description}</p>

                                        {/* Stock Info (Admin vs User) */}
                                        <div className="mb-4 text-sm">
                                            {currentUser && currentUser.is_admin === true ? (
                                                <div className="flex items-center text-gray-700 bg-gray-50 p-2 rounded-lg">
                                                    <span className="font-semibold mr-2">Inventory:</span>
                                                    <span className={product.stock > 5 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>{product.stock} units</span>
                                                </div>
                                            ) : (
                                                <span className={`text-xs font-bold px-2 py-1 rounded ${product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                                                </span>
                                            )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2 mt-auto">
                                            <button
                                                onClick={() => handleAddTocartlist(product)}
                                                disabled={product.stock <= 0}
                                                className={`flex-1 py-2.5 cursor-pointer px-4 rounded-xl font-semibold text-sm flex justify-center items-center gap-2 transition-colors duration-200
                                                    ${product.stock > 0 ? "bg-pink-600 text-white hover:bg-pink-700 shadow-md shadow-pink-200" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                                                <FaShoppingCart className={product.stock > 0 ? "text-pink-100" : ""} />
                                                {product.stock > 0 ? "Add to Cart" : "Sold Out"}
                                            </button>

                                            <button
                                                onClick={() => handleAddToWishlist(product)}
                                                className="p-2.5 cursor-pointer rounded-xl border border-pink-200 text-pink-400 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-300 transition-colors duration-200">
                                                <FaHeart size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                            <div className="bg-gray-50 p-6 rounded-full mb-4">
                                <FaShoppingCart size={40} className="text-gray-300" />
                            </div>
                            <h2 className="text-2xl text-gray-800 font-bold mb-2">No products found</h2>
                            <p className="text-gray-500">Try adjusting your filters or check back later.</p>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProductPage;
