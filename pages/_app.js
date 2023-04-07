// import '../schemas/db.mjs"

export default function App({ Component, pageProps }){
    // in next.js, _app.js is the top-level react component that wraps all pages in the application
    // we can use this component to keep state when navigating between pages, or to add global styles
    // server needs to be restart everytime we update _app
    // global css style can only be imported here

    return <Component {...pageProps} />
}