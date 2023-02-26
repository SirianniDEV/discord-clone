import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { useEffect, useState, } from 'react'
import axios from 'axios';
import { getAllChannels } from "@/database";

function wait(seconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, seconds * 1000)
    })
}


export default function Channels({channels}) {

//   const [channels, setChannels] = useState([])

//   useEffect(() => {
//     axios.get("/api/channels")
//     .then((response) => {
//       setChannels(response.data)
//     })
//   })
  return (
    <div>
        <h1>Channels</h1>
        <ul>
            {channels.map((channels) => (
                <li key={channels.id}>{channels.name}</li>
            ))}
        </ul>
    </div>
)
}

export async function getServerSideProps() {

// runs on the server
const channels = await getAllChannels();

return {
    props: {
        channels: JSON.parse(JSON.stringify(channels))
    }
}

}