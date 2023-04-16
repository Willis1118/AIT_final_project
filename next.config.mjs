/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development' ?
                "http://localhost:3000/api" : "https://dreamdiffusion.vercel.app/api",
    },
    serverRuntimeConfig: {
        secret: 'A SECRET KEY',
    }
}

export default nextConfig;