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
import styled from "styled-components"
import AvatarOnline from "../AvatarOnline"
import PopoverMenu from "../PopoverMenu"

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

const WrapperUserChat = styled(Flex)`
    &:hover {
        background: #f3f5f5;

        & .btn-option {
            display: block !important;
        }
    }
`

const UserChat = () => {
    return (
        <WrapperUserChat
            align="center"
            gap={10}
            style={{ padding: "10px 10px", borderRadius: 5, marginRight: 5, cursor: "pointer" }}
        >
            <AvatarOnline online />
            <Flex vertical gap="none">
                <Typography.Text style={{ fontSize: 15, fontWeight: 500 }}>
                    Nguyen Phan Viet Trung
                </Typography.Text>
                <Typography.Text style={{ fontSize: 12 }}>slkdfjsdkfjsd . 12 giờ</Typography.Text>
            </Flex>
            <Popover content={ContentPop} trigger="click">
                <Button
                    shape="circle"
                    icon={<EllipsisOutlined />}
                    className="btn-option"
                    style={{ position: "absolute", right: 50, display: "none" }}
                />
            </Popover>
        </WrapperUserChat>
    )
}

export default UserChat
