import ChatBox from "~/components/ChatBox"
import DefaultLayout from "~/components/layouts/DefaultLayout"
import ChatSider from "~/components/siders/ChatSider"

const ChatPage = () => {
    return <DefaultLayout sider={<ChatSider />} content={<ChatBox />} />
}

export default ChatPage
