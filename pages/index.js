import Head from 'next/head'
import Image from 'next/image'

import styles from '../styles/Home.module.css'
import { useEffect, useState, } from 'react'

// import axios from 'axios';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Discord Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Discord 2.0</h1> <br/>
        <div className={styles.card}>
          <a href="/channels"><h2> View Channels</h2></a>
        </div>
       
      </main>
    </div>
  )
}
