import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useState, useEffect } from 'react';

import styles from '../styles/home.module.css'
import Layout from '../components/layout';
import { getSession } from '../utils/api/get-session';

export async function getServerSideProps(context){
    const session = await getSession(context.req, context.res);

    return {
        props: {
            data: session.user ? session.user : null
        }
    };
}

export default function Home({ data }){

    const [user, setUser] = useState(null);
    
    useEffect(() => {
        setUser(data);
    }, [data]);

    console.log("frontend session", user);

    return (
        <>
            <Layout sessionData={user}> { /* this will give true on home */}
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
                            required={true}
                        />
                        <input type="submit" />
                    </form>
                </div>
            </Layout>
        </>
    )
}