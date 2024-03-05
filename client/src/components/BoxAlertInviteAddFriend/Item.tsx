import { UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Flex, Typography, theme } from "antd"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { IInvite } from "~/redux/interface/invite.interface"
import { IUser } from "~/redux/interface/user.interface"
import { inviteActions } from "~/redux/slice/invite.slice"
import { inviteTypes } from "~/redux/type/invite.type"

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

    // const invite_id = invite?._id
    // const sender_id = invite?.sender?._id
    // const sender_name = invite?.sender?.displayName
    // const sender_picture = invite?.sender?.picture

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
                        dispatch(inviteActions[inviteTypes.ACCEPT_INVITE](invite_id))
                        dispatch(inviteActions[inviteTypes.GET_LIST_INVITES]({}))
                    }}
                >
                    Đồng ý
                </Button>
                <Button>Xóa</Button>
            </Flex>
        </Flex>
    )
}

export default Item
