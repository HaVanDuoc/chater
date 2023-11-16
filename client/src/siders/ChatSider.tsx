import { Avatar, Button, Flex, Popover, Typography, theme } from "antd"
import SearchSider from "~/components/sider/SearchSider"
import TitleSider from "~/components/sider/TitleSider"
import { Flex as Header } from "antd"
import { Flex as ListChat } from "antd"
import { Flex as Footer } from "antd"
import {
    AlignLeftOutlined,
    ExclamationCircleOutlined,
    LogoutOutlined,
    MessageOutlined,
    QuestionCircleOutlined,
    SafetyOutlined,
    SettingOutlined,
    StopOutlined,
    UserOutlined,
    WarningOutlined,
} from "@ant-design/icons"
import UserChat from "~/components/sider/UserChat"
import PopoverMenu from "~/components/PopoverMenu"
import { useSelector } from "react-redux"
import { selectUser } from "~/redux/selectors"
import { useEffect } from "react"

const ChatSider = () => {
    const paddingCSS = "7px 15px"
    const { colorBorder } = theme.useToken().token

    const user = useSelector(selectUser)

    useEffect(() => {
        console.log("userSelector", user)
    }, [user])

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
            <Header vertical style={{ padding: paddingCSS }} className="headerSider">
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

            <Footer
                justify="space-between"
                style={{ padding: paddingCSS, zIndex: 2, boxShadow: "0 0 3px 0px rgba(0,0,0,0.2" }}
            >
                <Flex align="center">
                    <Popover content={OptionAccount} trigger="click">
                        <Avatar size={35} icon={<UserOutlined />} style={{ cursor: "pointer" }} />
                    </Popover>
                    <Typography
                        style={{
                            marginLeft: 10,
                            pointerEvents: "none",
                            fontSize: 15,
                            fontWeight: 500,
                        }}
                    >
                        Ha Van Duoc
                    </Typography>
                </Flex>

                <Flex>
                    <Button
                        size="large"
                        shape="circle"
                        icon={<SettingOutlined />}
                        style={{ border: "none" }}
                    />
                </Flex>
            </Footer>
        </Flex>
    )
}

export default ChatSider

const OptionAccount = () => {
    const menu = [
        { content: "Tuỳ chọn", icon: <SettingOutlined />, hasDivider: true },
        { content: "Tài khoản đã hạn chế", icon: <StopOutlined />, hasDivider: true },
        { content: "Quyền riêng tư & an toàn", icon: <SafetyOutlined />, hasDivider: true },
        { content: "Trợ giúp", icon: <QuestionCircleOutlined /> },
        { content: "Báo cáo sự cố", icon: <WarningOutlined />, hasDivider: true },
        { content: "Giới thiệu", icon: <ExclamationCircleOutlined /> },
        { content: "Điều khoản", icon: <AlignLeftOutlined /> },
        { content: "Chính sách quyền riêng tư", icon: <AlignLeftOutlined /> },
        { content: "Chính sách về cookie", icon: <AlignLeftOutlined />, hasDivider: true },
        { content: "Dùng thử Chater dành cho Windows", icon: <MessageOutlined /> },
        { content: "Đăng xuất", icon: <LogoutOutlined /> },
    ]

    return <PopoverMenu data={menu} />
}
