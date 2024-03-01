import {
    BellOutlined,
    CheckOutlined,
    DeleteOutlined,
    LockOutlined,
    MinusCircleOutlined,
    PhoneOutlined,
    ReconciliationOutlined,
    UserOutlined,
    VideoCameraOutlined,
    WarningOutlined,
} from "@ant-design/icons"
import PopoverMenu from "~/components/PopoverMenu"
import { IChat } from "~/redux/interface/chat.interface"
import { IUser } from "~/redux/users/interfaces"

const ContentPopoverBoxChat = (chatId: IChat["_id"]) => {
    const handleDeleteChat = (chatId: IUser["_id"]) => {
        console.log("click")
        // dispatch(modalActions[modalTypes.OPEN])
    }

    const menu = [
        { content: "Đánh dấu là chưa đọc", icon: <CheckOutlined /> },
        { content: "Tắt thông báo", icon: <BellOutlined /> },
        { content: "Xem trang cá nhân", icon: <UserOutlined />, hasDivider: true },
        { content: "Bắt đầu đoạn chat mã hóa đầu cuối", icon: <LockOutlined />, hasDivider: true },
        { content: "Gọi thoại", icon: <PhoneOutlined /> },
        { content: "Chat video", icon: <VideoCameraOutlined />, hasDivider: true },
        { content: "Chặn", icon: <MinusCircleOutlined /> },
        { content: "Lưu trữ đoạn chat", icon: <ReconciliationOutlined /> },
        {
            content: "Xóa đoạn chat",
            icon: <DeleteOutlined />,
            onClick: () => handleDeleteChat(chatId),
        },
        { content: "Báo cáo", icon: <WarningOutlined /> },
    ]

    return <PopoverMenu data={menu} />
}

export default ContentPopoverBoxChat
