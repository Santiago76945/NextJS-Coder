// components/Navbar.js
"use client";

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function Navbar() {
    const { cart } = useCart();
    const { user, loading } = useAuth();
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <nav className="flex justify-between items-center p-4 bg-white shadow">
            <ul className="flex space-x-4">
                <li>
                    <Link href="/">Inicio</Link>
                </li>
                <li>
                    <Link href="/catalog">Catálogo</Link>
                </li>
                <li>
                    <Link href="/cart">Carrito ({cartCount})</Link>
                </li>
                <li>
                    <Link href="/admin">Admin</Link>
                </li>
            </ul>
            <div>
                {loading ? (
                    <p>Cargando...</p>
                ) : user ? (
                    <div className="flex items-center space-x-4">
                        <p>{user.email}</p>
                        <button
                            onClick={handleSignOut}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center space-x-4">
                        <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition">
                            Iniciar Sesión
                        </Link>
                        <Link href="/register" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition">
                            Registrarse
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

