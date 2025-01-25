// app/register/page.js
"use client";

import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setSuccess(true);
            // Opcional: Redirigir al usuario después de registrarse
            // router.push('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Registrar Usuario</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">Usuario registrado exitosamente.</p>}
            <form onSubmit={handleRegister}>
                <div className="mb-4">
                    <label className="block mb-1">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>
                <button type="submit" className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 transition">
                    Registrar
                </button>
            </form>
        </div>
    );
}
