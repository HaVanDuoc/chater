import { Flex, theme } from "antd"
import SearchSider from "~/components/sider/SearchSider"
import TitleSider from "~/components/sider/TitleSider"
import { Flex as Header } from "antd"
import { Flex as ListChat } from "antd"
import UserChat from "~/components/sider/UserChat"
import ChatSiderFooter from "./ChatSiderFooter"

const ChatSider = () => {
    const { colorBorder } = theme.useToken().token

    return (
        <Flex
            vertical
            style={{
                position: "relative",
                height: "100%",
                zIndex: 2,
                borderRight: `1px solid ${colorBorder}`,
            }}
        >
            <Header vertical className="headerSider">
                <TitleSider content="Chat" />
                <SearchSider placeholder="Tìm kiếm trên Chater" />
            </Header>

            <ListChat
                vertical
                style={{
                    margin: "10px 0px 10px 7px",
                    overflowY: "auto",
                    flex: 1,
                }}
            >
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
                <UserChat />
            </ListChat>

            <ChatSiderFooter />
        </Flex>
    )
}

export default ChatSider
