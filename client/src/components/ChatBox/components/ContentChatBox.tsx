import React, { useEffect, useRef } from "react"
import Message from "./Message"
import { Flex } from "antd"

export const messages = [
    { sender: "user", content: "Hello!" },
    { sender: "user", content: "Hello!" },
    { sender: "user", content: "Hello!" },
    { sender: "other", content: "Hi, how are you?" },
    { sender: "other", content: "Hi, how are you?" },
    { sender: "user", content: "Hello!" },
    { sender: "other", content: "Hi, how are you?" },
    { sender: "user", content: "Hello!" },
    { sender: "other", content: "Hi, how are you?" },
    { sender: "user", content: "Hello!" },
    { sender: "other", content: "Hi, how are you?" },
    { sender: "user", content: "Hello!" },
    { sender: "other", content: "Hi, how are you?" },
    { sender: "user", content: "Hello!" },
    { sender: "other", content: "Hi, how are you?" },
    { sender: "user", content: "Hello!" },
    { sender: "other", content: "Hi, how are you?" },
    { sender: "user", content: "Hello!" },
    { sender: "other", content: "Hi, how are you?" },
    { sender: "user", content: "Hello!" },
    { sender: "other", content: "Hi, how are you?" },
    { sender: "user", content: "Hello!" },
    { sender: "other", content: "Hi, how are you?" },
    { sender: "user", content: "Hello!" },
    { sender: "other", content: "Hi, how are you?" },
    { sender: "user", content: "Hello!" },
    { sender: "other", content: "Hi, how are you?" },
    { sender: "user", content: "Hello!" },
    { sender: "other", content: "Hi, how are you?" },
    { sender: "other", content: "Hi, how are you?" },
    { sender: "other", content: "Hi, how are you?" },
    { sender: "other", content: "Hi, how are you?" },
    { sender: "other", content: "Hi, how are you?" },
    { sender: "other", content: "Hi, how are you?" },
    { sender: "user", content: "Oke I'm fine thank you, and you?!" },
]

const ContentChatBox = () => {
    const scrollRef = useRef(null)

    useEffect(() => {
        if (scrollRef.current) {
            const htmlElement = scrollRef.current as HTMLElement
            const { scrollHeight, clientHeight } = htmlElement
            htmlElement.scrollTop = scrollHeight - clientHeight
        }
    }, [])

    return (
        <Flex
            vertical
            style={{
                padding: "10px",
                overflowY: "auto",
                height: "calc(100vh - 100px)",
                background: "#fff",
            }}
            ref={scrollRef}
        >
            {messages.map((message, index) => (
                <Message
                    key={index}
                    sender={message.sender}
                    content={message.content}
                    isUser={message.sender === "user"}
                    isSameSender={index > 0 && messages[index - 1].sender === message.sender}
                    isLast={
                        index === messages.length - 1 ||
                        messages[index + 1].sender !== message.sender
                    }
                />
            ))}
        </Flex>
    )
}

export default ContentChatBox
