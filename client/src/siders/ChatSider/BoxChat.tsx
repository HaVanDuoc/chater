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
import { useState } from "react"
import { useNavigate } from "react-router"
import AvatarOnline from "~/components/AvatarOnline"
import PopoverMenu from "~/components/PopoverMenu"

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

interface IBoxChat {
    data: any
}

const BoxChat: React.FC<IBoxChat> = ({ data }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isDefault, setDefault] = useState(true)
    const navigate = useNavigate()

    if (data?.type !== "default") {
        setDefault(false)
    }

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
            onClick={() => {
                navigate(`/chat/${data?._id}`)
            }}
        >
            <AvatarOnline avt={isDefault ? data?.members[0]?.picture : data?.picture} online />
            <Flex vertical gap="none">
                <Typography.Text style={{ fontSize: 15, fontWeight: 500 }}>
                    {isDefault ? data?.members[0]?.name : data?.name}
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

export default BoxChat
