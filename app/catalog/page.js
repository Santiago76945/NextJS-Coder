// app/catalog/page.js

"use client";

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';

export default function CatalogPage() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsCollection = collection(db, 'products');
                const productsSnapshot = await getDocs(productsCollection);
                const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProducts(productsList);
                setFilteredProducts(productsList);

                // Obtener las categorías únicas de los productos
                const uniqueCategories = Array.from(new Set(productsList.map(product => product.category)));
                setCategories(["Todos", ...uniqueCategories]);
            } catch (err) {
                console.error(err);
                setError('Error al obtener los productos');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Actualizar los productos filtrados cada vez que cambie la categoría seleccionada
    useEffect(() => {
        if (selectedCategory === "Todos") {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(product => product.category === selectedCategory));
        }
    }, [selectedCategory, products]);

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Catálogo de Productos</h1>

            {/* Filtro de categorías */}
            <div className="mb-4">
                <label htmlFor="category" className="mr-2 font-semibold">Filtrar por categoría:</label>
                <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border p-2 rounded"
                >
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            {/* Listado de productos filtrados */}
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
        </div>
    );
}

