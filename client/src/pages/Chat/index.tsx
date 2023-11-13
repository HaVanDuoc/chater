import React from "react"
import DefaultLayout from "~/layouts/DefaultLayout"
import ChatSider from "~/siders/ChatSider"

const ChatPage = () => {
    return <DefaultLayout sider={<ChatSider />} />
}

export default ChatPage
