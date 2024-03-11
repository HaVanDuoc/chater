import Message from "./Message"
import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { selectChat, selectCurrentUser } from "~/redux/selectors"
import { Flex } from "antd"
import { useDispatch } from "react-redux"
import { useParams } from "react-router"

const ContentChatBox = () => {
    const dispatch = useDispatch()
    const scrollRef = useRef(null)
    const { chatId } = useParams()
    const current_user_id = useSelector(selectCurrentUser)?.data?._id
    const chat = useSelector(selectChat).getListChat.data?.find((c) => c._id === chatId)
    const messages = chat?.messages?.slice().reverse()

    useEffect(() => {
        if (scrollRef.current) {
            const htmlElement = scrollRef.current as HTMLElement
            const { scrollHeight, clientHeight } = htmlElement
            htmlElement.scrollTop = scrollHeight - clientHeight
        }
    }, [messages, dispatch])

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
            {messages &&
                messages?.map((message: any, index) => {
                    return (
                        <Message
                            key={index}
                            sender={message.sender?.displayName}
                            avatar={message.sender?.picture}
                            content={message.content}
                            isUser={message?.sender?._id === current_user_id} // current user
                            isSameSender={
                                index > 0 &&
                                messages[index - 1]?.sender?._id === message?.sender?._id
                            }
                            isLast={
                                index === message?.length - 1 ||
                                messages[index + 1]?.sender?._id !== message.sender?._id
                            }
                        />
                    )
                })}
        </Flex>
    )
}

export default ContentChatBox
