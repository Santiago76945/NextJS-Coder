// app/product/[id]/ProductDetailClient.js

"use client";

import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function ProductDetailClient({ product }) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    // Si el producto tiene variantes, por ejemplo:
    const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : null);
    const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : null);

    const handleAddToCart = () => {
        // Validar stock (suponiendo que product.stock existe)
        if (product.stock && quantity > product.stock) {
            alert("La cantidad solicitada supera el stock disponible");
            return;
        }

        const productToAdd = {
            ...product,
            quantity,
            // Incluir variantes si existen
            size: selectedSize,
            color: selectedColor,
        };

        addToCart(productToAdd);
        alert("Producto añadido al carrito");
    };

    return (
        <div>
            <div className="mb-4">
                <label className="mr-2 font-semibold">Cantidad:</label>
                <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="border p-1 rounded w-20"
                />
            </div>
            {product.sizes && (
                <div className="mb-4">
                    <label className="mr-2 font-semibold">Tamaño:</label>
                    <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="border p-1 rounded"
                    >
                        {product.sizes.map(size => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                </div>
            )}
            {product.colors && (
                <div className="mb-4">
                    <label className="mr-2 font-semibold">Color:</label>
                    <select
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="border p-1 rounded"
                    >
                        {product.colors.map(color => (
                            <option key={color} value={color}>{color}</option>
                        ))}
                    </select>
                </div>
            )}
            <button
                onClick={handleAddToCart}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
            >
                Añadir al Carrito
            </button>
        </div>
    );
}
