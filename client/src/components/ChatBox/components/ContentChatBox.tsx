import React, { useEffect, useRef } from "react"
import Message from "./Message"
import { Avatar, Button, Flex, Typography } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { useParams } from "react-router"
import { useDispatch } from "react-redux"
import { actions } from "~/redux/users/slice"
import ActionTypes from "~/redux/users/types"
import { useSelector } from "react-redux"
import { selectUser } from "~/redux/selectors"

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

const InfoFriend = () => {
    const { userId } = useParams()
    const dispatch = useDispatch()
    const user = useSelector(selectUser)?.data

    const _id: any = user?._id
    const picture: any = user?.picture
    const given_name: any = user?.given_name

    useEffect(() => {
        const data = { _id: userId }
        dispatch(actions[ActionTypes.GET_USER_REQUEST](data))
    }, [userId, dispatch])

    const handleRequestFriend = (receiver: string) => {
        const data = { receiver }
        dispatch(actions[ActionTypes.FRIEND_REQUEST](data))
    }

    return (
        <Flex vertical gap={7} align="center" justify="center" style={{ padding: 50 }}>
            <Avatar src={picture || ""} icon={<UserOutlined />} size={60} />
            <Typography.Text strong style={{ fontSize: 18 }}>
                {given_name}
            </Typography.Text>
            <Flex vertical justify="center" align="center">
                <Typography.Text style={{ fontSize: 13, color: "#555" }}>Chater</Typography.Text>
                <Typography.Text style={{ fontSize: 13, color: "#555" }}>
                    Các bạn không phải là bạn bè trên Chater
                </Typography.Text>
            </Flex>
            <Button type="primary" style={{ margin: 10 }} onClick={() => handleRequestFriend(_id)}>
                Gửi lời mời kết bạn
            </Button>
        </Flex>
    )
}

interface IContentChatBox {
    data: any
}

const ContentChatBox: React.FC<IContentChatBox> = ({ data }) => {
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
            {data ? (
                messages.map((message, index) => (
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
                ))
            ) : (
                <InfoFriend />
            )}
        </Flex>
    )
}

export default ContentChatBox
