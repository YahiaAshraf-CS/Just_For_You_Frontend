import React, { useState } from "react";
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
            const response = await fetch("http://127.0.0.1:5000/api/admin/api/products", {
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
        <div>
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-center mt-10 text-pink-600">Add New Product</h1>
            <div className="flex items-center justify-center mt-12">
                <form onSubmit={handleProduct} className="flex flex-col border-2 border-pink-700 shadow-2xl shadow-pink-400 w-[95%] md:w-[70%] lg:w-[50%] rounded-3xl px-6 py-6 items-center gap-6">
                    <div className="flex gap-4 w-full">
                        <input
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            type="text"
                            required
                            className="outline-0 border-2 w-full px-4 py-2.5 rounded-2xl border-pink-600 focus:bg-pink-100"
                            placeholder="Product Name"
                        />
                        <input
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            required
                            className="outline-0 border-2 w-full px-4 py-2.5 rounded-2xl border-pink-600"
                            placeholder="Price"
                        />
                    </div>

                    <input
                        type="text"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        required
                        placeholder="Description"
                        className="outline-0 border-2 w-full px-4 py-2.5 rounded-2xl border-pink-600"
                    />

                    <input
                        type="file"
                        accept="image/*"
                        required
                        // Capture the first file in the array
                        onChange={(e) => setImageFile(e.target.files[0])}
                        className="outline-0 border-2 w-full px-4 py-2.5 rounded-2xl border-pink-600"
                    />

                    <input
                        type="text"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        required
                        placeholder="Category"
                        className="outline-0 border-2 w-full px-4 py-2.5 rounded-2xl border-pink-600"
                    />

                    <input
                        type="number"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                        required
                        placeholder="Stock Quantity"
                        className="outline-0 border-2 w-full px-4 py-2.5 rounded-2xl border-pink-600"
                    />

                    <button type="submit" className="bg-pink-600 text-xl lg:text-2xl text-white cursor-pointer px-5 font-bold py-2.5 rounded-xl w-full hover:bg-pink-700 transition">
                        Add Product
                    </button>

                    {error && <p className="text-red-600 font-bold">❌ {error}</p>}
                </form>
            </div>
        </div>
    );
}

export default AddProduct;
