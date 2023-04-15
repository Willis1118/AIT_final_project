import Link from "next/link"
import Layout from "../../components/layout";
import Head from "next/head";

import styles from '../../styles/login.module.css';

export default function Login(){
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <Layout>
                <div className={styles.container}>
                    <form className={styles.form}>
                        <h2>Welcome to Dream Diffusion</h2>
                        <label htmlFor="username">Email: </label>
                        <input type="text" name="username" />
                        <label htmlFor="password">Password: </label>
                        <input type="text" name="password" />
                        <input type="submit" value="Login" />
                    </form>
                </div>
                
            </Layout>
        </>
    )
}