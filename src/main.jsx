import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { register } from 'swiper/element/bundle'
import { CartProvider } from './context/CartContext.jsx'
register();
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <CartProvider>
            <App />
        </CartProvider>
    </StrictMode>,
);
