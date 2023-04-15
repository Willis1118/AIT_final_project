module.exports = {
    publicRuntimeConfig: {
        apiUrl: process.env.NODE_ENV === 'development' ?
                "http://localhost:3000/api" : "https://dreamdiffusion.vercel.app/api",
    }
}