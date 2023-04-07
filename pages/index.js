import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import styles from '../styles/home.module.css'
import Layout from '../components/layout';
 
// this will be the / page of our website

// export async function getStaticPaths(){
//     // this function will return a list of all possible value for the dynamic path
//     // the return object must contain a param key and id object, and will be passed into getStaticProps
// }

// const __root = path.join(process.cwd(), '');

// export async function getStaticProps(){
//     // this function will running on server-side, fetch data before rendering the page and integrate the data into the page
//     // we want to use this function to fetch the image in our public/image dir
//     // the content will be injected into the path before sent to browser
//     const content = fs.readFileSync(path.join(__root, '/README.md'), 'utf-8');

//     return {
//         props:{
//             content
//         }
//     }
//}

export default function Home({ content }){
return (
    <>
        <Layout home> { /* this will give true on home */}
            <Head>
                <title>Dream Diffusion</title>
            </Head>
            
            <form action="/posts/post" method="GET" className={styles.form}>
                <label htmlFor="description" className={styles.label}> Start Dreaming: <a>(or should we do it for you?)</a></label>
                <input type="text" name="prompt" placeholder="Who lurks into your dream..."/>
                <input type="submit" />
            </form>
        </Layout>
    </>
)
}