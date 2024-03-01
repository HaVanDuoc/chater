import { Fragment, useEffect } from "react"
import { Flex as WrapChatBox } from "antd"
import HeaderChatBox from "./components/HeaderChatBox"
import ContentChatBox from "./components/ContentChatBox"
import FooterChatBox from "./components/FooterChatBox"
import { useParams } from "react-router"
import { useSelector } from "react-redux"
import { selectAuth, selectChat, selectMessage } from "~/redux/selectors"
import { useDispatch } from "react-redux"
import { widthSider } from "../layouts/DefaultLayout"
import { actions as userActions } from "~/redux/slice/user.slice"
import { userTypes } from "~/redux/type/user.type"
import InfoFriend from "./components/InfoFriend"
import { chatActions } from "~/redux/slice/chat.slice"
import { chatTypes } from "~/redux/type/chat.type"
import { getGroupAvatar } from "../siders/ChatSider/BoxChat"

const ChatBox = () => {
    const dispatch = useDispatch()
    const { userId } = useParams()
    const { chatId } = useParams()
    const chats = useSelector(selectChat)
    const messages = useSelector(selectMessage)?.data
    const currentUser = useSelector(selectAuth).user?._id

    useEffect(() => {
        dispatch(userActions[userTypes.GET_USER]({ userId }))
    }, [userId, dispatch])

    useEffect(() => {
        dispatch(chatActions[chatTypes.GET_CHAT]({ chatId }))
    }, [chatId, dispatch])

    const chat = useSelector(selectChat).chat
    const { avatar, name } = getGroupAvatar(chat?.members || [], currentUser)

    return (
        <>
            {userId ? (
                <WrapChatBox
                    vertical
                    justify="space-between"
                    style={{ marginLeft: widthSider, height: "100vh" }}
                >
                    <HeaderChatBox name={name} avatar={avatar} />
                    <InfoFriend />
                </WrapChatBox>
            ) : (
                <Fragment />
            )}

            {chatId ? (
                <WrapChatBox
                    vertical
                    justify="space-between"
                    style={{ marginLeft: widthSider, height: "100vh" }}
                >
                    <HeaderChatBox name={name} avatar={avatar} />
                    <ContentChatBox data={messages} />
                    <FooterChatBox data={chats} />
                </WrapChatBox>
            ) : (
                <Fragment />
            )}
        </>
    )
}

export default ChatBox
