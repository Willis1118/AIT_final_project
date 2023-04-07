import React from "react";

import Link from "next/link";
import Head from "next/head";

import styles from '../styles/layout.module.css'

export default function Layout({ children, home }){ // have to specify name as children when access content between tags
    return(
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className={styles.header}>
                <div className={styles.left}>
                    <Link className={styles.nav} href="/history">History</Link>
                    <Link className={styles.nav} href="/posts">Post</Link>
                </div>
                <Link className={styles.title} href="/">Dream Diffusion</Link>
                <div className={styles.right}>
                    <Link className={styles.nav} href="/login">Login</Link>
                </div>
            </header>
            
            <main className={styles.content}> { children }</main>
            
            <footer className={styles.footer}>
                <Link className={styles.nav} href="/about">About Us</Link>
            </footer>
        </>
    )
}