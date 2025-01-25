// app/page.js

import Link from 'next/link'
// Si tienes mock data de productos, adáptalo a tu ruta real
import { products } from '@/data/products'  // Ajusta si no usas alias '@/'

export default function HomePage() {
  // Ejemplo: tomamos los primeros 3 productos del mock como “destacados”
  const featuredProducts = products.slice(0, 3)

  return (
    <main className="py-8 px-4">
      {/* Sección de bienvenida */}
      <section className="flex flex-col items-center text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">¡Bienvenido a Mi Tienda!</h1>
        <p className="max-w-md mb-6 text-gray-700">
          Encuentra los mejores productos a los mejores precios. 
          Aprovecha nuestras ofertas y lleva tu experiencia de compra al siguiente nivel.
        </p>
        <Link 
          href="/catalog" 
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-500 transition"
        >
          Ver el Catálogo
        </Link>
      </section>

      {/* Sección de productos destacados */}
      <section className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Productos Destacados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <article key={product.id} className="bg-white border border-gray-200 rounded shadow p-4">
              <h3 className="font-medium text-lg mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">Precio: ${product.price}</p>
              <p className="text-sm text-gray-500 mb-4">
                {product.description ?? 'Sin descripción'}
              </p>
              <Link 
                href={`/product/${product.id}`} 
                className="text-blue-600 hover:underline"
              >
                Ver Detalle
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

