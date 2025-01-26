// next.config.mjs

import { createRequire } from 'module'
const require = createRequire(import.meta.url)

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'example.com', // <= tu dominio
                port: '',
                pathname: '/images/**',  // o la ruta donde tengas tus imágenes
            },
        ],
    },
}

export default nextConfig
