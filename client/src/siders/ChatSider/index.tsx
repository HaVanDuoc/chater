import { Flex, theme } from "antd"
import SearchSider from "~/components/sider/SearchSider"
import TitleSider from "~/components/sider/TitleSider"
import { Flex as Header } from "antd"
import { Flex as ListChat } from "antd"
import ChatSiderFooter from "./ChatSiderFooter"
import { useSelector } from "react-redux"
import { selectUser } from "~/redux/selectors"
import { useEffect } from "react"
import BoxAlertInviteAddFriend from "~/components/BoxAlertInviteAddFriend"
import { paddingSider } from "~/components/sider/styles"
import BoxChat from "./BoxChat"

const ChatSider = () => {
    const { colorBorder } = theme.useToken().token
    const user = useSelector(selectUser)
    const chats = user?.currentUser?.chats || []

    // useEffect(() => {
    //     console.log("user", user)
    // }, [user])

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
                {chats.map((chat: any, index: number) => {
                    return <BoxChat data={chat} key={index} />
                })}
            </ListChat>

            <ChatSiderFooter />
        </Flex>
    )
}

export default ChatSider
