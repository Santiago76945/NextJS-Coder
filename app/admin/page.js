// app/admin/page.js

"use client";

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function AdminPage() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'products'), {
                name,
                price: parseFloat(price),
                description,
            });
            alert('Producto añadido exitosamente');
            setName('');
            setPrice('');
            setDescription('');
        } catch (error) {
            console.error("Error añadiendo producto: ", error);
            alert('Error al añadir el producto');
        }
    };

    return (
        <div>
            <h1>Panel de Administración</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label className="block mb-1">Nombre del Producto</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full border px-3 py-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Precio</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="w-full border px-3 py-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Descripción</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full border px-3 py-2"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded"
                >
                    Añadir Producto
                </button>
            </form>
        </div>
    );
}

