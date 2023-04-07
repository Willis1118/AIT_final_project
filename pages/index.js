import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useState } from 'react';

import styles from '../styles/home.module.css'
import Layout from '../components/layout';

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
                
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label htmlFor="description" className={styles.label}> Start Dreaming: <a>(or should we do it for you?)</a></label>
                    <input 
                        type="text" 
                        name="prompt" 
                        placeholder="Who lurks into your dream..." 
                        onChange={(e) => {setPrompt(e.target.value)}} 
                    />
                    <input type="submit" />
                </form>
            </Layout>
        </>
    )
}