import { UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Flex, Typography, theme } from "antd"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { acceptInvite, rejectInvite } from "~/redux/actions/invite.action"
import { IInvite } from "~/redux/interface/invite.interface"
import { IUser } from "~/redux/interface/user.interface"

interface IItem {
    invite_id: IInvite["_id"]
    sender_id: IUser["_id"]
    sender_displayName: IUser["displayName"]
    sender_picture: IUser["picture"]
}

const Item: React.FC<IItem> = ({ invite_id, sender_id, sender_displayName, sender_picture }) => {
    const [isHover, setHover] = useState<boolean>(false)
    const { colorBgTextHover } = theme.useToken().token
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <Flex
            align="center"
            justify="space-between"
            gap={60}
            style={{
                backgroundColor: isHover ? colorBgTextHover : "inherit",
                padding: 10,
                borderRadius: 5,
                cursor: "pointer",
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <Flex
                align="center"
                gap={7}
                onClick={() => {
                    navigate(`/user/${sender_id}`)
                }}
            >
                <Avatar icon={<UserOutlined />} src={sender_picture || ""} />
                <Typography.Text>{sender_displayName}</Typography.Text>
            </Flex>
            <Flex gap={8}>
                <Button
                    type="primary"
                    onClick={() => {
                        dispatch(acceptInvite(invite_id))
                    }}
                >
                    Đồng ý
                </Button>
                <Button
                    onClick={() => {
                        dispatch(rejectInvite(invite_id))
                    }}
                >
                    Xóa
                </Button>
            </Flex>
        </Flex>
    )
}

export default Item
