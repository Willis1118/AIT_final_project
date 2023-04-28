import { useState, useEffect } from "react";
import Head from "next/head";

import Layout from "../components/layout";
import { getSession } from '../utils/api/get-session';
import styles from '../styles/account.module.css';

export async function getServerSideProps(context){
    const session = await getSession(context.req, context.res);

    return {
        props: {
            data: session.user ? session.user : null
        }
    };
}

export default function About({ data }){

    const [user, setUser] = useState(null);
    
    useEffect(() => {
        setUser(data);
    }, [data]);

    return (
        <Layout sessionData={user}>
            <Head>
                <title>About</title>
            </Head>
            <div className={styles.container}>
                <h1>Willis' final project for AIT</h1>
            </div>
        </Layout>
    )
}