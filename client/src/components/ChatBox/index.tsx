import React from "react"
import { Flex as WrapChatBox } from "antd"
import { widthSider } from "~/layouts/DefaultLayout"
import HeaderChatBox from "./components/HeaderChatBox"
import ContentChatBox from "./components/ContentChatBox copy"
import FooterChatBox from "./components/FooterChatBox copy"

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
