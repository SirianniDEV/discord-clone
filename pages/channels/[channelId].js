import { getAllMessages } from "@/database";
import { useState } from "react";
import axios from "axios";

export default function Channel({channelId, messages: initialMessages}) {

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
        <div>
            <h1>Channel {channelId}</h1>
            <ul>
                {messages.map((message) => (
                    <li key={message.id}>{message.text}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export async function getServerSideProps(context) {
    // This is always server side
    // From the server, we can connect to the database
    const channelId = context.query.channelId
    const messages = await getAllMessages(channelId)
    return {
        props: {
            channelId,
            messages: JSON.parse(JSON.stringify(messages))
        }
    }
}