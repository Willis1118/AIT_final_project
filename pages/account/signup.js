import Link from "next/link";
import Head from "next/head";

import Layout from "../../components/layout";
import styles from '../../styles/login.module.css';

export default function Login(){
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <Layout>
                <div className={styles.container}>
                    <form action="/api/users" method="POST" className={styles.form}>
                        <h2>Welcome to Dream Diffusion</h2>
                        <label htmlFor="username">Email: </label>
                        <input type="text" name="username" />
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" />
                        <input type="submit" value="Sign Up" />
                        <p>Already have an account? <Link href="/account/login">Log in</Link></p>
                    </form>
                </div>
                
            </Layout>
        </>
    )
}