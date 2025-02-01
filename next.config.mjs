// next.config.mjs

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'example.com', // Actualizar al dominio real si es necesario
                port: '',
                pathname: '/images/**',
            },
        ],
    },
};

export default nextConfig;

