import { Fragment } from "react"
import { Flex as WrapChatBox } from "antd"
import HeaderChatBox from "./components/HeaderChatBox"
import ContentChatBox from "./components/ContentChatBox"
import FooterChatBox from "./components/FooterChatBox"
import { useParams } from "react-router"
import { useSelector } from "react-redux"
import { selectChat, selectCurrentUser } from "~/redux/selectors"
import { widthSider } from "../layouts/DefaultLayout"
import { getGroupAvatarAndName } from "../siders/ChatSider/BoxChat"

const ChatBox = () => {
    const { chatId } = useParams()
    const currentUser = useSelector(selectCurrentUser).data?._id
    const chat = useSelector(selectChat).getListChat.data?.find((c) => c._id === chatId)
    const { avatar, name } = getGroupAvatarAndName(chat?.members ?? [], currentUser)

    return (
        <>
            {chatId ? (
                <WrapChatBox
                    vertical
                    justify="space-between"
                    style={{ marginLeft: widthSider, height: "100vh" }}
                >
                    <HeaderChatBox name={name} avatar={avatar} />
                    <ContentChatBox />
                    <FooterChatBox />
                </WrapChatBox>
            ) : (
                <Fragment />
            )}
        </>
    )
}

export default ChatBox
