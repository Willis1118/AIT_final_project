import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useState } from 'react';

import styles from '../styles/home.module.css'
import Layout from '../components/layout';

export async function getServerSideProps(context){
    const fetchOption = {
        method: 'GET',
    };

    const response = await fetch("http://localhost:3000/api/prompt", fetchOption); //only for production
    const data = await response.json(); // required to parse response

    console.log(data)

    return {
        props: {
            data
        }
    };
}

export default function Home({ content }){

    const router = useRouter()
    const [prompt, setPrompt] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        
        router.push({
            pathname: '/posts/post',
            query: {prompt: prompt}
        });
    }

    return (
        <>
            <Layout home> { /* this will give true on home */}
                <Head>
                    <title>Dream Diffusion</title>
                </Head>
                <div className={styles.container}>
                    <form action="/api/prompt" method="POST" className={styles.form}>
                        <label htmlFor="description" className={styles.label}> Start Dreaming: <a>(or should we do it for you?)</a></label>
                        <input 
                            type="text" 
                            name="prompt" 
                            placeholder="Who lurks into your dream..." 
                            onChange={(e) => {setPrompt(e.target.value)}} 
                            required={true}
                        />
                        <input type="submit" />
                    </form>
                </div>
            </Layout>
        </>
    )
}