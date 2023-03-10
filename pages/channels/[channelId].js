import { getAllMessages, } from "@/database";
import { useState } from "react";
import Head from 'next/head'
import Image from "next/image";
import Link from "next/link";
import styles from '../../styles/Home.module.css'
import axios from "axios";

export default function Channel({ channelId, messages: initialMessages}) {

    const [userName, setUserName] = useState('')
    const [text, setText] = useState('')
    const [messages, setMessages] = useState(initialMessages)

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('submit', userName, text)
        // Send to the database (POST)

        const result = await axios.post(`/api/channels/${channelId}/messages`, {
            userName, text
        })
        const newMessage = result.data

        setMessages([...messages, newMessage])
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Discord Clone</title>
                <meta name="description" content="Generated by create next app" />
                {/* <link rel='icon' href='/notdiscord.svg'/> */}
            </Head>

            <div className={styles.main}>
                
                <nav className={styles.nav}>
                    <Link href='/channels'><Image src='/back-arrow.svg' width={50} height={50} alt='knock off version of the discord logo'/></Link>
                    <Link href='/'><Image src="/notdiscord.svg" width={50} height={50} alt="knock off version of the discord logo"/></Link>
                </nav>

                
                <h1>Channel <span style={{ color:'#72e3fc'}}>{channelId} </span></h1>
                <p> The start of the channel conversation begins here:</p>
                <ul className={styles.speech}>
                    {messages.map((message) => (
                        <li className={styles.speechBubble} key={message.id}> 
                            <p> &quot;{message.text}&quot; </p>
                            <div className={styles.userName}> by {message.userName} </div> 
                        </li>
                    ))}
                </ul>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input className={styles.formMessage} placeholder="Insert message" type="text" value={text} onChange={(e) => setText(e.target.value)} />
                    <br/><label> Username:</label><input className={styles.formUsername} placeholder="Insert username" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} /> 
                    <button className={styles.formButton} type="submit">Send</button>
                </form>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    // This is always server side
    // From the server, we can connect to the database
    const channelId = context.query.channelId
    //const channel = conext.query.channelName //name of channel
    const messages = await getAllMessages(channelId)
    console.log({channelId, messages})
    return {
        props: {
            channelId,
            messages: JSON.parse(JSON.stringify(messages))
        }
    }
}