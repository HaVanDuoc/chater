import { UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Flex, Typography, theme } from "antd"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import ActionTypes from "~/redux/users/actionTypes"
import { actions } from "~/redux/users/slice"

interface IItem {
    data: {
        _id: string
        sender: {
            _id: string
            name: string
            picture: string
        }
    }
}

const Item: React.FC<IItem> = ({ data }) => {
    const [isHover, setHover] = useState<boolean>(false)
    const { colorBgTextHover } = theme.useToken().token
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const invite_id = data?._id
    const sender_id = data?.sender?._id
    const sender_name = data?.sender?.name
    const sender_picture = data?.sender?.picture

    return (
        <Flex
            align="center"
            justify="space-between"
            gap={60}
            style={{
                backgroundColor: isHover ? colorBgTextHover : "inherit",
                padding: 10,
                borderRadius: 5,
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <Flex
                align="center"
                gap={7}
                onClick={() => {
                    navigate(`/chat/${sender_id}`)
                }}
            >
                <Avatar icon={<UserOutlined />} src={sender_picture || ""} />
                <Typography.Text>{sender_name}</Typography.Text>
            </Flex>
            <Flex gap={8}>
                <Button
                    type="primary"
                    onClick={() => {
                        dispatch(actions[ActionTypes.ACCEPT_FRIEND_REQUEST](invite_id))
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
