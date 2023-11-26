import { Flex as Footer } from "antd"
import PopoverMenu from "~/components/PopoverMenu"
import { Avatar, Button, Flex, Popover, Typography } from "antd"
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
import { useSelector } from "react-redux"
import { selectUser } from "~/redux/selectors"
import { useDispatch } from "react-redux"
import { actions } from "~/redux/users/slice"
import ActionTypes from "~/redux/users/types"

const ChatSiderFooter = () => {
    const paddingCSS = "7px 15px"
    const currentUser = useSelector(selectUser)?.currentUser
    const dispatch = useDispatch()

    const handleLogout = () => {
        console.log("logout")
        dispatch(actions[ActionTypes.LOGOUT]({}))
    }

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
            { content: "Đăng xuất", icon: <LogoutOutlined />, onClick: handleLogout },
        ]

        return <PopoverMenu data={menu} />
    }

    return (
        <Footer
            justify="space-between"
            style={{ padding: paddingCSS, zIndex: 2, boxShadow: "0 0 3px 0px rgba(0,0,0,0.2" }}
        >
            <Flex align="center">
                <Popover content={OptionAccount} trigger="click">
                    <Avatar
                        size={35}
                        icon={<UserOutlined />}
                        src={currentUser?.picture}
                        style={{ cursor: "pointer" }}
                    />
                </Popover>
                <Typography
                    style={{
                        marginLeft: 10,
                        pointerEvents: "none",
                        fontSize: 15,
                        fontWeight: 500,
                    }}
                >
                    {currentUser?.name}
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
    )
}

export default ChatSiderFooter
