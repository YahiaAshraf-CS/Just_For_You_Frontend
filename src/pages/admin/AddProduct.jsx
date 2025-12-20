import React from 'react'
import { NavLink } from 'react-router-dom';
import { useState } from "react";

function AddProduct() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    description: "",
    image: "",
    category: "",
    stock: 0
  });
  const [error, setError] = useState("");


  const handleproduct = async (e) => {
    e.preventDefault();
    console.log(newProduct);
    const response = await fetch("http://127.0.0.1:5000/api/admin/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    const data = await response.json();
    alert(data.message);
    console.log(data);
    if (data.status === "error") {
      setError(data.message);
      return;
    }

  };


  return (
      <div>
          <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-center mt-50 text-pink-600">Add the New Product here</h1>
          <div className="flex items-center justify-center mt-12">
              <form
                  // onSubmit={handleproduct}
                  action=""
                  className="flex flex-col border-2  border-pink-700  shadow-2xl shadow-pink-400 h-fill w-[95%] md:w-[70%] lg:w-[50%] xl:w-[50%] rounded-3xl px-6 py-6 items-center justify-center gap-10">
                  <div className="flex items-center justify-center gap-4 w-full">
                      <input
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                          type="text"
                          required
                          className=" outline-0 border-2 focus:placeholder-pink-700 w-full px-4 py-2.5 rounded-2xl placeholder:text-pink-600 border-pink-600 focus:border-pink-800 focus:shadow-3xl focus:text-pink-700 focus:bg-pink-200"
                          placeholder="Product Name"
            />
            {/* <label htmlFor="number" >enter price</label> */}
                      <input
                          type="number"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                          required
                          className=" outline-0 border-2 w-full px-4 py-2.5 rounded-2xl placeholder:text-pink-600 border-pink-600 focus:border-pink-800 focus:shadow-3xl focus:text-pink-700 focus:bg-pink-200"
                          placeholder="product price"
                      />
                  </div>
                  <input
                      type="text"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      required
                      placeholder="Enter Description"
                      className=" outline-0 border-2 w-full px-4 py-2.5 rounded-2xl placeholder:text-pink-600 border-pink-600 focus:border-pink-800 focus:shadow-3xl focus:text-pink-700 focus:bg-pink-200"
                  />
                  <input
                      type="text"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      required
                      placeholder="Enter product category"
                      className=" outline-0 border-2 w-full px-4 py-2.5 rounded-2xl placeholder:text-pink-600 border-pink-600 focus:border-pink-800 focus:shadow-3xl focus:text-pink-700 focus:bg-pink-200"
                  />

                  <input
            type="file"
            value={newProduct.image}
            accept="image/*"
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                      required
                      placeholder="upload your product image"
                      className=" outline-0 border-2 w-full px-4 py-2.5 rounded-2xl placeholder:text-pink-600 border-pink-600 focus:border-pink-800 focus:shadow-3xl focus:text-pink-700 focus:bg-pink-200"
                  />
                  <input
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                      required
                      placeholder="Enter your product quantity"
                      className=" outline-0 border-2 w-full px-4 py-2.5 rounded-2xl placeholder:text-pink-600 border-pink-600 focus:border-pink-800 focus:shadow-3xl focus:text-pink-700 focus:bg-pink-200"
                  />
                  <div className="btns w-full gap-6  h-fit flex items-center justify-center flex-col">
                      <button
                          onClick={handleproduct}
                          type="submit"
                          className=" bg-[var(--color-prinky)] text-white px-6 py-2 rounded-2xl w-[100%] transition duration-300 ease-in-out border-2 border-[var(--color-prinky)] cursor-pointer text-2xl hover:bg-transparent flex items-center justify-center  h-[45px] mt-1 hover:shadow-2xl hover:shadow-pink-500 hover:text-[var(--color-prinky)]">
                          <span>Add Product</span>
                      </button>
                  </div>
                  {error && <p className="text-2xl font-bold text-red-600">❌❌ {error} ❌❌</p>}
              </form>
          </div>
      </div>
  );
}

export default AddProduct
