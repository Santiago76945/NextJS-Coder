// app/layout.js

import './globals.css'; // Aquí ya debería importarse Tailwind o tu CSS global

export const metadata = {
  title: 'Coderhouse E-commerce',
  description: 'Proyecto Next.js con diseño básico',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      {/* 
        Tailwind classes de ejemplo:
          - bg-gray-50: fondo gris claro
          - text-gray-800: texto gris oscuro
      */}
      <body className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
        {/* Encabezado global */}
        <header className="bg-white border-b shadow-sm p-4">
          <h1 className="text-2xl font-bold">Mi Tienda</h1>
        </header>
        
        {/* Contenedor principal */}
        <main className="container mx-auto p-4 flex-grow">
          {children}
        </main>
        
        {/* Footer global */}
        <footer className="bg-white border-t shadow-sm p-4 text-center">
          <p>© 2025 - Mi Tienda</p>
        </footer>
      </body>
    </html>
  );
}
