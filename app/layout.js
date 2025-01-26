// app/layout.js

import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'Coderhouse E-commerce',
  description: 'Proyecto Next.js con diseño básico',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
        <AuthProvider>
          <CartProvider>
            {/* Navbar */}
            <Navbar />

            {/* Contenedor principal */}
            <main className="container mx-auto p-4 flex-grow">
              {children}
            </main>

            {/* Footer global */}
            <footer className="bg-white border-t shadow-sm p-4 text-center">
              <p>© 2025 - Mi Tienda</p>
            </footer>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
