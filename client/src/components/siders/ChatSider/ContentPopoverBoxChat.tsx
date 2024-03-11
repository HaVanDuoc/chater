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
import { useDispatch } from "react-redux"
import PopoverMenu from "~/components/PopoverMenu"
import { IChat } from "~/redux/interface/chat.interface"
import { chatActions } from "~/redux/slice/chat.slice"
import { chatTypes } from "~/redux/type/chat.type"

const ContentPopoverBoxChat = (chatId: IChat["_id"]) => {
    const dispatch = useDispatch()

    const handleDeleteChat = (chatId: IChat["_id"]) => {
        console.log("Delete Chat")
        dispatch(chatActions[chatTypes.DELETE_CHAT](chatId))
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
        { content: "Báo cáo", icon: <WarningOutlined /> },
        {
            content: "Xóa đoạn chat",
            icon: <DeleteOutlined />,
            onClick: () => handleDeleteChat(chatId),
        },
    ]

    return <PopoverMenu data={menu} />
}

export default ContentPopoverBoxChat
