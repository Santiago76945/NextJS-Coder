// context/CartContext.js
"use client";

import { createContext, useState, useContext } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prev, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => setCart([]);

    const createOrder = async (userId, cartItems) => {
        try {
            await addDoc(collection(db, 'orders'), {
                userId,
                items: cartItems,
                createdAt: Timestamp.now(),
            });
            clearCart();
            alert('Orden creada exitosamente');
        } catch (error) {
            console.error("Error creando orden: ", error);
            alert('Error al crear la orden');
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
