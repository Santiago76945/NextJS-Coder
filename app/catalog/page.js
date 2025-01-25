// app/catalog/page.js

import { products } from '@/data/products';

export default function CatalogPage() {
    return (
        <div>
            <h1>Catálogo de Productos</h1>
            <ul>
                {products.map(item => (
                    <li key={item.id}>
                        {item.name} - ${item.price}
                    </li>
                ))}
            </ul>
        </div>
    );
}
