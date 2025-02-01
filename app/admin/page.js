// app/admin/page.js

"use client";

import { useState, useEffect } from 'react';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState(null);
    // Campos opcionales para stock y variantes:
    const [stock, setStock] = useState(0);
    const [sizes, setSizes] = useState('');
    const [colors, setColors] = useState('');

    useEffect(() => {
        if (!loading && !user) {
            // Si el usuario no está autenticado, redirige a login
            router.push('/login');
        }
        // Aquí también podrías verificar el rol del usuario para mayor seguridad
    }, [user, loading]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let imageUrl = '';
            if (imageFile) {
                // Subir imagen a Firebase Storage
                const storageRef = ref(storage, `products/${imageFile.name}`);
                const snapshot = await uploadBytes(storageRef, imageFile);
                imageUrl = await getDownloadURL(snapshot.ref);
            }

            await addDoc(collection(db, 'products'), {
                name,
                price: parseFloat(price),
                description,
                imageUrl,
                stock: parseInt(stock),
                // Convertir cadenas separadas por coma en arrays (para tamaños y colores)
                sizes: sizes ? sizes.split(',').map(s => s.trim()) : [],
                colors: colors ? colors.split(',').map(c => c.trim()) : [],
                // Puedes agregar otros campos o metadatos según lo requieras
            });
            alert('Producto añadido exitosamente');
            // Reiniciar formulario
            setName('');
            setPrice('');
            setDescription('');
            setImageFile(null);
            setStock(0);
            setSizes('');
            setColors('');
        } catch (error) {
            console.error("Error añadiendo producto: ", error);
            alert('Error al añadir el producto');
        }
    };

    if (loading || !user) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">Nombre del Producto</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full border px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block">Precio</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className="w-full border px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block">Descripción</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full border px-3 py-2"
                    ></textarea>
                </div>
                <div>
                    <label className="block">Stock</label>
                    <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                        className="w-full border px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block">Tamaños (separados por coma)</label>
                    <input
                        type="text"
                        value={sizes}
                        onChange={(e) => setSizes(e.target.value)}
                        className="w-full border px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block">Colores (separados por coma)</label>
                    <input
                        type="text"
                        value={colors}
                        onChange={(e) => setColors(e.target.value)}
                        className="w-full border px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block">Imagen del Producto</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                    />
                </div>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
                    Añadir Producto
                </button>
            </form>
        </div>
    );
}
