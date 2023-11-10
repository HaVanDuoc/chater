import React from "react"
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
    return (
        <Flex
            vertical
            style={{
                padding: "10px",
                overflowY: "auto",
                height: "calc(100vh - 100px)",
                background: "#fff",
            }}
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
