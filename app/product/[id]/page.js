// app/product/[id]/page.js
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useCart } from '@/context/CartContext';

export async function generateStaticParams() {
    const productsCollection = collection(db, 'products');
    const productsSnapshot = await getDocs(productsCollection);
    const products = productsSnapshot.docs.map(doc => ({ id: doc.id }));

    return products.map(product => ({
        id: product.id,
    }));
}

export default function ProductDetailPage({ params }) {
    const { id } = params;
    const [product, setProduct] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            const productRef = doc(db, 'products', id);
            const productSnap = await getDoc(productRef);
            if (productSnap.exists()) {
                setProduct({ id: productSnap.id, ...productSnap.data() });
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) return <p>Cargando...</p>;

    return (
        <div>
            <h1>{product.name}</h1>
            <p>Precio: ${product.price}</p>
            <p>{product.description}</p>
            <button
                onClick={() => addToCart(product)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
                Añadir al Carrito
            </button>
        </div>
    );
}
