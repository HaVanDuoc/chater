import { Fragment, useEffect } from "react"
import { Flex as WrapChatBox } from "antd"
import HeaderChatBox from "./components/HeaderChatBox"
import ContentChatBox from "./components/ContentChatBox"
import FooterChatBox from "./components/FooterChatBox"
import { useParams } from "react-router"
import { useSelector } from "react-redux"
import { selectChat, selectMessage, selectUser } from "~/redux/selectors"
import { useDispatch } from "react-redux"
import { widthSider } from "../layouts/DefaultLayout"
import { actions as userActions } from "~/redux/slice/user.slice"
import { types as userTypes } from "~/redux/type/user.type"
import InfoFriend from "./components/InfoFriend"

const ChatBox = () => {
    const dispatch = useDispatch()
    const { userId } = useParams()
    const { chatId } = useParams()
    const chats = useSelector(selectChat)
    const messages = useSelector(selectMessage)?.data

    // console.log("userId", userId)
    // console.log("chatId", chatId)

    useEffect(() => {
        dispatch(userActions[userTypes.GET_USER]({ userId }))
    }, [userId, dispatch])

    const user = useSelector(selectUser).data

    const name_chat = userId ? user?.displayName : "ten chat"
    const avatar_chat = userId ? user?.picture : "avatar chat"

    return (
        <>
            {userId && chats && (
                <WrapChatBox
                    vertical
                    justify="space-between"
                    style={{ marginLeft: widthSider, height: "100vh" }}
                >
                    <HeaderChatBox name={name_chat} avatar={avatar_chat} />
                    {userId ? <InfoFriend /> : <ContentChatBox data={messages} />}
                    {!userId ? <FooterChatBox data={chats} /> : <Fragment />}
                </WrapChatBox>
            )}
        </>
    )
}

export default ChatBox
