import React, { useState } from "react";
import { FaBoxOpen, FaCloudUploadAlt, FaTag, FaDollarSign, FaLayerGroup } from "react-icons/fa";
// Keeping NavLink if you need it later, though not used in this specific form
import { NavLink } from "react-router-dom";

function AddProduct() {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: 0,
        description: "",
        category: "",
        stock: 0,
    });

    // We store the actual File object in a separate state
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState("");

    const handleProduct = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        // 1. Create a FormData object (required for file uploads)
        const formData = new FormData();
        formData.append("name", newProduct.name);
        formData.append("price", newProduct.price);
        formData.append("description", newProduct.description);
        formData.append("category", newProduct.category);
        formData.append("stock", newProduct.stock);

        // 2. Append the physical file
        if (imageFile) {
            formData.append("image", imageFile);
        } else {
            setError("Please select an image");
            return;
        }

        try {
            const response = await fetch("https://justforyoubackend-production.up.railway.app/api/admin/products", {
                method: "POST",
                // IMPORTANT: Do NOT set Content-Type header manually when sending FormData.
                // The browser will automatically set it to 'multipart/form-data' with the correct boundary.
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                alert("Product added successfully!");
                // Reset form if needed
            } else {
                setError(data.message || "Failed to add product");
            }
        } catch (err) {
            setError("Could not connect to the server.");
            console.error(err);
        }
    };

    return (
        <div className="w-full">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
                <p className="text-sm text-gray-500 mt-1">Create a new item in your inventory.</p>
            </div>

            <div className="max-w-4xl mx-auto">
                <form onSubmit={handleProduct} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    {/* Form Header */}
                    <div className="border-b border-gray-100 pb-6 mb-6">
                        <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                            <FaBoxOpen className="text-pink-600" /> Product Details
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Name */}
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                            <input
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                type="text"
                                required
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 outline-none transition-all duration-200"
                                placeholder="e.g. Luxury Perfume"
                            />
                        </div>

                        {/* Category */}
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <div className="relative">
                                <span className="absolute left-4 top-3.5 text-gray-400">
                                    <FaTag />
                                </span>
                                <input
                                    type="text"
                                    value={newProduct.category}
                                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                    required
                                    placeholder="e.g. perfume, makeup"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 outline-none transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Price (EGP)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-3.5 text-gray-400">
                                    <FaDollarSign />
                                </span>
                                <input
                                    type="number"
                                    value={newProduct.price}
                                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                    required
                                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 outline-none transition-all duration-200"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        {/* Stock */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                            <div className="relative">
                                <span className="absolute left-4 top-3.5 text-gray-400">
                                    <FaLayerGroup />
                                </span>
                                <input
                                    type="number"
                                    value={newProduct.stock}
                                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                                    required
                                    placeholder="0"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 outline-none transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                                value={newProduct.description}
                                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                required
                                rows="3"
                                placeholder="Enter product description..."
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-pink-500 focus:bg-white focus:ring-2 focus:ring-pink-200 outline-none transition-all duration-200 resize-none"></textarea>
                        </div>

                        {/* Image Upload */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors bg-gray-50">
                                <FaCloudUploadAlt className="text-4xl text-gray-400 mb-2" />
                                <span className="text-sm text-gray-500 mb-2">Click to upload image</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    required
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                    className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-pink-50 file:text-pink-700
                                    hover:file:bg-pink-100 cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-semibold border border-red-100">❌ {error}</div>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-pink-600 text-white font-bold py-3.5 rounded-xl hover:bg-pink-700 hover:shadow-lg shadow-pink-200 transition-all duration-200 transform hover:-translate-y-0.5">
                        Publish Product
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;
