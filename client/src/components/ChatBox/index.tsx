import React from "react"
import { Flex as WrapChatBox } from "antd"
import { widthSider } from "~/layouts/DefaultLayout"
import HeaderChatBox from "./components/HeaderChatBox"
import ContentChatBox from "./components/ContentChatBox"
import FooterChatBox from "./components/FooterChatBox"

const ChatBox = () => {
    return (
        <WrapChatBox vertical style={{ marginLeft: widthSider, height: "100vh" }}>
            <HeaderChatBox />
            <ContentChatBox />
            <FooterChatBox />
        </WrapChatBox>
    )
}

export default ChatBox
