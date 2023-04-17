import React from "react";

import Link from "next/link";
import Head from "next/head";

import styles from '../styles/layout.module.css'

export default function Layout({ children, sessionData }){ // have to specify name as children when access content between tags

    console.log(sessionData);

    return(
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className={styles.header}>
                <div className={styles.left}>
                    {sessionData && <Link className={styles.nav} href="/history">History</Link>}
                    {sessionData && <Link className={styles.nav} href="/posts">Post</Link>}
                </div>
                <Link className={styles.title} href="/">Dream Diffusion</Link>
                <div className={styles.right}>
                    {sessionData ? 
                    <Link className={styles.nav} href="/account/main">{sessionData.firstName} {sessionData.lastName[0]+'.'}</Link> :
                    <Link className={styles.nav} href="/account/signup">Sign Up</Link>}
                </div>
            </header>
            
            <main className={styles.content}> { children }</main>
            
            <footer className={styles.footer}>
                <Link className={styles.nav} href="/about">About Us</Link>
            </footer>
        </>
    )
}