import DefaultLayout from "~/components/layouts/DefaultLayout"
import ChatSider from "~/components/siders/ChatSider"

const ChatPage = () => {
    return <DefaultLayout sider={<ChatSider />} />
}

export default ChatPage
