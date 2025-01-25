// app/cart/page.js
"use client";

import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
    const { cart, removeFromCart, clearCart, createOrder } = useCart();
    const router = useRouter();

    const [userId, setUserId] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Implementa la lógica de autenticación real aquí
        setUserId('usuario_actual'); // Reemplaza con la lógica real
    }, []);

    const handleOrder = async () => {
        if (!userId) {
            setError('Debes estar autenticado para crear una orden.');
            // Opcional: Redirigir al usuario a la página de inicio de sesión
            // router.push('/login');
            return;
        }

        if (cart.length === 0) {
            setError('El carrito está vacío.');
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            await createOrder(userId, cart);
            // Opcional: Redirigir al usuario a una página de confirmación
            // router.push('/order-confirmation');
        } catch (err) {
            setError('Hubo un problema al crear la orden. Por favor, intenta de nuevo.');
            console.error(err);
        } finally {
            setIsProcessing(false);
        }
    };

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Carrito de Compras</h1>

            {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

            {cart.length === 0 ? (
                <p className="text-gray-600">Tu carrito está vacío.</p>
            ) : (
                <div>
                    <ul className="space-y-4">
                        {cart.map(item => (
                            <li key={item.id} className="flex items-center justify-between border-b pb-4">
                                <div>
                                    <h2 className="text-xl font-semibold">{item.name}</h2>
                                    <p className="text-gray-600">Precio: ${item.price}</p>
                                    <p className="text-gray-600">Cantidad: {item.quantity}</p>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition"
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 flex justify-between items-center">
                        <p className="text-2xl font-bold">Total: ${total.toFixed(2)}</p>
                        <div className="flex space-x-4">
                            <button
                                onClick={handleOrder}
                                disabled={isProcessing}
                                className={`px-6 py-3 bg-green-600 text-white rounded hover:bg-green-500 transition ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                {isProcessing ? 'Procesando...' : 'Crear Orden'}
                            </button>
                            <button
                                onClick={clearCart}
                                disabled={isProcessing}
                                className={`px-6 py-3 bg-gray-600 text-white rounded hover:bg-gray-500 transition ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                Vaciar Carrito
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

