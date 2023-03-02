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
        <link rel="icon" href="/notdiscord.svg" />
      </Head>

      <main className={styles.main}>
        <Image src="/notdiscord.svg" width={100} height={100}/>
        <h1 className={styles.title}>Welcome to NOT Discord </h1> <br/>
        <div className={styles.card}>
          <a href="/channels"><h2> View Channels</h2></a>
        </div>
       
      </main>
    </div>
  )
}
