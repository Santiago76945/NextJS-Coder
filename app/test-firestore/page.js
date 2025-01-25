// app/test-firestore/page.js
"use client";

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function TestFirestore() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsCollection = collection(db, 'products');
                const productsSnapshot = await getDocs(productsCollection);
                const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProducts(productsList);
            } catch (err) {
                console.error(err);
                setError('Error al obtener los productos');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Productos de Firestore</h1>
            <ul className="space-y-4">
                {products.map(product => (
                    <li key={product.id} className="border p-4 rounded shadow">
                        <h2 className="text-xl font-semibold">{product.name}</h2>
                        <p>Precio: ${product.price}</p>
                        {product.description && <p>Descripción: {product.description}</p>}
                    </li>
                ))}
            </ul>
        </div>
    );
}
