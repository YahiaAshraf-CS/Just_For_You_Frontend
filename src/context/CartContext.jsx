import { useState, useEffect } from "react";
import { CartContext } from "./CartContext.js";

export const CartProvider = ({ children }) => {
    // بنحاول نجيب الداتا من اللوكال ستوريج عشان لو عمل ريفريش متضيعش
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // دالة إضافة منتج
    const addToCart = (product) => {
        setCartItems((prevItems) => {
            // بنشيك لو المنتج موجود أصلاً نزود الكمية بس
            const isItemInCart = prevItems.find((item) => item.id === product.id);

            if (isItemInCart) {
                return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
            }
            // لو جديد بنضيفه ونحط كمية 1
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    // دالة حذف منتج (إضافي ليك)
    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    // أي تغيير في الكارت نحفظه في المتصفح تلقائي
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    return <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>{children}</CartContext.Provider>;
};

        