import { useEffect } from "react"
import { Flex as WrapChatBox } from "antd"
import { widthSider } from "~/layouts/DefaultLayout"
import HeaderChatBox from "./components/HeaderChatBox"
import ContentChatBox from "./components/ContentChatBox"
import FooterChatBox from "./components/FooterChatBox"
import { useParams } from "react-router"
import { useSelector } from "react-redux"
import { selectChat } from "~/redux/selectors"
import { useDispatch } from "react-redux"
import { chatActions } from "~/redux/chats/slice"
import chatTypes from "~/redux/chats/types"

const ChatBox = () => {
    const dispatch = useDispatch()
    const { chatId } = useParams()
    const chats = useSelector(selectChat)

    const name_chat =
        chats?.data?.type === "default" ? chats?.data?.members[0]?.name : chats?.data?.name
    const avatar_chat =
        chats?.data?.type === "default" ? chats?.data?.members[0]?.picture : chats?.data?.avatar

    useEffect(() => {
        if (chatId) {
            dispatch(chatActions[chatTypes.FETCH_CHAT_REQUEST](chatId))
        }
    }, [chatId, dispatch])

    return (
        <>
            {chats && (
                <WrapChatBox vertical style={{ marginLeft: widthSider, height: "100vh" }}>
                    <HeaderChatBox name={name_chat} avatar={avatar_chat} />
                    <ContentChatBox data={chats} />
                    <FooterChatBox data={chats} />
                </WrapChatBox>
            )}
        </>
    )
}

export default ChatBox
