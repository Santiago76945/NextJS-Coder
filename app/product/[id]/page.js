// app/product/[id]/page.js

import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ProductDetailClient from './ProductDetailClient';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const productsCollection = collection(db, 'products');
    const productsSnapshot = await getDocs(productsCollection);
    const products = productsSnapshot.docs.map(doc => ({ id: doc.id }));

    return products.map(product => ({
        id: product.id,
    }));
}

export default async function ProductDetailPage({ params }) {
    const { id } = params;

    const productRef = doc(db, 'products', id);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
        // Retornar página 404
        return notFound();
    }

    const product = { id: productSnap.id, ...productSnap.data() };

    return (
        <div className="max-w-4xl mx-auto p-4 flex flex-col md:flex-row">
            <Image
                src={product.imageUrl}
                alt={product.name}
                width={600}
                height={400}
                className="w-full md:w-1/2 h-64 object-cover mb-4 md:mb-0"
            />
            <div className="md:ml-6">
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-xl text-green-600 mb-4">${product.price}</p>
                <p className="mb-4">{product.description}</p>
                {/* Componente cliente para la selección de cantidad y variantes */}
                <ProductDetailClient product={product} />
            </div>
        </div>
    );
}

