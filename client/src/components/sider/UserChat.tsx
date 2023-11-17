import {
    BellOutlined,
    CheckOutlined,
    DeleteOutlined,
    EllipsisOutlined,
    LockOutlined,
    MinusCircleOutlined,
    PhoneOutlined,
    ReconciliationOutlined,
    UserOutlined,
    VideoCameraOutlined,
    WarningOutlined,
} from "@ant-design/icons"
import { Button, Flex, Popover, Typography } from "antd"
import React from "react"
import AvatarOnline from "../AvatarOnline"
import PopoverMenu from "../PopoverMenu"
import { IUser } from "~/redux/users/interfaces"

const ContentPop = () => {
    const menu = [
        { content: "Đánh dấu là chưa đọc", icon: <CheckOutlined /> },
        { content: "Tắt thông báo", icon: <BellOutlined /> },
        { content: "Xem trang cá nhân", icon: <UserOutlined />, hasDivider: true },
        { content: "Bắt đầu đoạn chat mã hóa đầu cuối", icon: <LockOutlined />, hasDivider: true },
        { content: "Gọi thoại", icon: <PhoneOutlined /> },
        { content: "Chat video", icon: <VideoCameraOutlined />, hasDivider: true },
        { content: "Chặn", icon: <MinusCircleOutlined /> },
        { content: "Lưu trữ đoạn chat", icon: <ReconciliationOutlined /> },
        { content: "Xóa đoạn chat", icon: <DeleteOutlined /> },
        { content: "Báo cáo", icon: <WarningOutlined /> },
    ]

    return <PopoverMenu data={menu} />
}

interface IUserChat {
    user?: IUser
    key?: any
}

const UserChat: React.FC<IUserChat> = ({ user, key }) => {
    const [isHovered, setIsHovered] = React.useState(false)

    return (
        <Flex
            align="center"
            gap={10}
            style={{
                position: "relative",
                padding: "10px 10px",
                borderRadius: 5,
                marginRight: 5,
                cursor: "pointer",
                background: isHovered ? "#f3f5f5" : "inherit",
            }}
            onMouseEnter={() => {
                setIsHovered(true)
            }}
            onMouseLeave={() => {
                setIsHovered(false)
            }}
            key={key}
        >
            <AvatarOnline avt={user?.picture} online />
            <Flex vertical gap="none">
                <Typography.Text style={{ fontSize: 15, fontWeight: 500 }}>
                    {user?.name}
                </Typography.Text>
                <Typography.Text style={{ fontSize: 12 }}>slkdfjsdkfjsd . 12 giờ</Typography.Text>
            </Flex>
            <Popover content={ContentPop} trigger="click">
                <Button
                    shape="circle"
                    icon={<EllipsisOutlined />}
                    className="btn-option"
                    style={{
                        position: "absolute",
                        right: 30,
                        display: isHovered ? "block" : "none",
                    }}
                />
            </Popover>
        </Flex>
    )
}

export default UserChat
