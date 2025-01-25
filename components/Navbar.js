// components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link href="/">Inicio</Link>
                </li>
                <li>
                    <Link href="/catalog">Catálogo</Link>
                </li>
                <li>
                    <Link href="/cart">Carrito</Link>
                </li>
                <li>
                    <Link href="/admin">Admin</Link>
                </li>
            </ul>
        </nav>
    );
}
