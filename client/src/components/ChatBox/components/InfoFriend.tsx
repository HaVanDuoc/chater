import { UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Flex, Typography } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useParams } from "react-router"
import { selectUser } from "~/redux/selectors"
import { actions as userActions } from "~/redux/slice/user.slice"
import { types as userTypes } from "~/redux/type/user.type"

const InfoFriend = () => {
    const [isFriend, setFriend] = useState<boolean>(false)
    const { userId: receiver } = useParams() // id người nhận
    const dispatch = useDispatch()
    const user = useSelector(selectUser)?.data
    const picture: any = user?.picture
    const given_name: any = user?.given_name

    useEffect(() => {
        const data = { _id: receiver }
        // dispatch(actions[ActionTypes.GET_USER_REQUEST](data))
    }, [receiver, dispatch])

    const handleAddFriend = () => {
        dispatch(userActions[userTypes.ADD_FRIEND](receiver))
    }

    return (
        <Flex vertical flex={1} gap={7} align="center" justify="center" style={{ padding: 50 }}>
            <Avatar src={picture || ""} icon={<UserOutlined />} size={60} />
            <Typography.Text strong style={{ fontSize: 18 }}>
                {given_name}
            </Typography.Text>
            <Flex vertical justify="center" align="center">
                <Typography.Text style={{ fontSize: 13, color: "#555" }}>Chater</Typography.Text>
                <Typography.Text style={{ fontSize: 13, color: "#555" }}>
                    Các bạn không phải là bạn bè trên Chater
                </Typography.Text>
            </Flex>
            <Button
                type="primary"
                danger={isFriend}
                style={{ margin: 10 }}
                children={isFriend ? "Hủy kết bạn" : "Gửi lời mời kết bạn"}
                onClick={() => handleAddFriend()}
            />
        </Flex>
    )
}

export default InfoFriend
