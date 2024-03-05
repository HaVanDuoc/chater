import BoxAlertInviteAddFriend from "~/components/BoxAlertInviteAddFriend"
import TitleSider from "~/components/sider/TitleSider"
import SearchSider from "~/components/sider/SearchSider"
import ChatSiderFooter from "./ChatSiderFooter"
import BoxChat from "./BoxChat"
import { Flex, Typography, theme } from "antd"
import { Flex as Header } from "antd"
import { IChat } from "~/redux/interface/chat.interface"
import { Flex as ListChat } from "antd"
import { useSelector } from "react-redux"
import { selectChat } from "~/redux/selectors"
import { paddingSider } from "~/components/sider/styles"

const ChatSider = () => {
    const { colorBorder } = theme.useToken().token
    const chats = useSelector(selectChat).getListChat.data

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

            <ListChat
                vertical
                style={{
                    margin: "10px 0px 10px 7px",
                    overflowY: "auto",
                    flex: 1,
                }}
            >
                {chats ? (
                    chats.map((chat: IChat, index: number) => {
                        return <BoxChat chat={chat} key={index} />
                    })
                ) : (
                    <Flex flex={1} justify="center" align="center">
                        <Typography.Title level={5}>
                            Bạn chưa tham gia đoạn chat nào!
                        </Typography.Title>
                    </Flex>
                )}
            </ListChat>

            <ChatSiderFooter />
        </Flex>
    )
}

export default ChatSider
