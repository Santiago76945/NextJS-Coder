// app/catalog/CatalogClient.js

"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function CatalogClient({ products }) {
    const [selectedCategory, setSelectedCategory] = useState('Todos');

    // Extraer las categorías únicas
    const categories = ['Todos', ...new Set(products.map(product => product.category))];

    // Filtrar los productos según la categoría seleccionada
    const filteredProducts = selectedCategory === 'Todos'
        ? products
        : products.filter(product => product.category === selectedCategory);

    return (
        <>
            <div className="mb-6">
                <label className="mr-2 font-semibold">Filtrar por categoría:</label>
                <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="border p-2 rounded"
                >
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                    <div key={product.id} className="border p-4 rounded shadow">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-48 object-cover mb-4"
                        />
                        <h2 className="text-xl font-semibold">{product.name}</h2>
                        <p className="text-gray-700">${product.price}</p>
                        <p className="text-gray-600">{product.description}</p>
                        <Link
                            href={`/product/${product.id}`}
                            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                        >
                            Ver Detalles
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}
