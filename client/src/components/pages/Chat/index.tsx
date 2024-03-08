
import DefaultLayout from "~/components/layouts/DefaultLayout"
import ChatSider from "~/components/siders/ChatSider"
import ChatBox from "./ChatBox"

const ChatPage = () => {
    return <DefaultLayout sider={<ChatSider />} content={<ChatBox />} />
}

export default ChatPage
