import BoxAlertInviteAddFriend from "~/components/BoxAlertInviteAddFriend"
import TitleSider from "~/components/sider/TitleSider"
import SearchSider from "~/components/sider/SearchSider"
import ChatSiderFooter from "./ChatSiderFooter"
import { Flex, theme } from "antd"
import { Flex as Header } from "antd"
import { paddingSider } from "~/components/sider/styles"
import ListBoxChat from "./ListBoxChat"

const ChatSider = () => {
    const { colorBorder } = theme.useToken().token

    return (
        <Flex
            vertical
            justify="space-between"
            style={{
                position: "relative",
                height: "100%",
                zIndex: 2,
                borderRight: `1px solid ${colorBorder}`,
            }}
        >
            <Header vertical className="headerSider">
                <Flex
                    flex={1}
                    align="center"
                    justify="space-between"
                    style={{ margin: paddingSider }}
                >
                    <TitleSider content="Chat" />
                    <BoxAlertInviteAddFriend />
                </Flex>
                <SearchSider placeholder="Tìm kiếm trên Chater" />
            </Header>

            <ListBoxChat />

            <ChatSiderFooter />
        </Flex>
    )
}

export default ChatSider
