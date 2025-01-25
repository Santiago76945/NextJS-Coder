// app/profile/page.js
"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    if (loading) return <p>Cargando...</p>;

    if (!user) {
        router.push('/login');
        return null;
    }

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Perfil de Usuario</h1>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>UID:</strong> {user.uid}</p>
        </div>
    );
}
