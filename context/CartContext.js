// context/CartContext.js

"use client";

import { createContext, useState, useContext } from 'react';
import { db } from '@/lib/firebase';
import {
    collection,
    addDoc,
    Timestamp,
    writeBatch,
    doc,
    getDoc,
} from 'firebase/firestore';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prev) => {
            // Si el producto ya está en el carrito (considerando variantes) se incrementa la cantidad
            const existing = prev.find(
                (item) =>
                    item.id === product.id &&
                    item.size === product.size &&
                    item.color === product.color
            );
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id &&
                        item.size === product.size &&
                        item.color === product.color
                        ? { ...item, quantity: item.quantity + product.quantity }
                        : item
                );
            } else {
                return [...prev, product];
            }
        });
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => setCart([]);

    const createOrder = async (userId, cartItems) => {
        const batch = writeBatch(db);

        try {
            // Actualizar stock de cada producto
            for (const item of cartItems) {
                const productRef = doc(db, 'products', item.id);
                const productSnap = await getDoc(productRef);
                if (!productSnap.exists()) {
                    throw new Error(`Producto ${item.id} no existe`);
                }
                const productData = productSnap.data();
                if (productData.stock < item.quantity) {
                    throw new Error(`Stock insuficiente para ${item.name}`);
                }
                batch.update(productRef, {
                    stock: productData.stock - item.quantity,
                });
            }

            // Crear orden
            const orderRef = doc(collection(db, 'orders'));
            batch.set(orderRef, {
                userId,
                items: cartItems,
                createdAt: Timestamp.now(),
            });

            await batch.commit();
            clearCart();
            alert('Orden creada exitosamente');
        } catch (error) {
            console.error("Error creando orden: ", error);
            alert('Error al crear la orden: ' + error.message);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, createOrder }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
