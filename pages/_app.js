import { createTheme, NextUIProvider } from '@nextui-org/react';

import '../styles/global.css';

const theme = createTheme({
    type: 'light',
    theme: {
        colors: {
            primary: '#fff',
            secondary: '#333',
        },
    }
})

export default function App({ 
    Component, 
    pageProps
}){
    // in next.js, _app.js is the top-level react component that wraps all pages in the application
    // we can use this component to keep state when navigating between pages, or to add global styles
    // server needs to be restart everytime we update _app
    // global css style can only be imported here

    return (
        <NextUIProvider disableBaseline={true} theme={theme}>
            <Component {...pageProps} />
        </NextUIProvider>
    );   
}