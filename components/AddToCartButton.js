// components/AddToCartButton.js

"use client";

import { useCart } from '@/context/CartContext';

export default function AddToCartButton({ product }) {
    const { addToCart } = useCart();

    return (
        <button
            onClick={() => addToCart(product)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
        >
            Añadir al Carrito
        </button>
    );
}
