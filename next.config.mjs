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
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'oaidalleapiprodscus.blob.core.windows.net',
                pathname: '/private/**'
            }
        ]
    },
    experimental: {
        largePageDataBytes: 128 * 100000,
    }
}

export default nextConfig;