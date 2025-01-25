// app/product/[id]/page.js

export default function ProductDetailPage({ params }) {
    const { id } = params;

    // Aquí podría hacerse un fetch o usar mock data

    return (
        <div>
            <h1>Detalle del Producto {id}</h1>
            <p>Información y descripción detallada...</p>
        </div>
    );
}
