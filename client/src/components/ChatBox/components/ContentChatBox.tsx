import React, { Fragment, useEffect, useRef } from "react"
import Message from "./Message"
import { useSelector } from "react-redux"
import { selectUser } from "~/redux/selectors"
import { Flex } from "antd"

interface IContentChatBox {
    data: any[]
}

const ContentChatBox: React.FC<IContentChatBox> = ({ data = [] }) => {
    const scrollRef = useRef(null)
    const current_user_id = useSelector(selectUser)?.currentUser?._id

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
            {data.length ? (
                data?.map((message, index) => (
                    <Message
                        key={index}
                        sender={message.sender?.name}
                        avatar={message.sender?.picture}
                        content={message.content}
                        isUser={message.sender?._id === current_user_id} // current user
                        isSameSender={
                            index > 0 && data[index - 1].sender?._id === message?.sender?._id
                        }
                        isLast={
                            index === data.length - 1 ||
                            data[index + 1].sender?._id !== message.sender?._id
                        }
                    />
                ))
            ) : (
                <Fragment />
            )}
        </Flex>
    )
}

export default ContentChatBox
