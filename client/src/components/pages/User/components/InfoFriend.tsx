import { BellOutlined, MessageOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Flex, Image, Typography } from "antd"
import { Fragment, useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useParams } from "react-router"
import { widthSider } from "~/components/layouts/DefaultLayout"
import HeaderChatBox from "../../../ChatBox/components/HeaderChatBox"
import { selectCurrentUser, selectInvite, selectUser } from "~/redux/selectors"
import { userActions } from "~/redux/slice/user.slice"
import { userTypes } from "~/redux/type/user.type"
import { inviteActions } from "~/redux/slice/invite.slice"
import { inviteTypes } from "~/redux/type/invite.type"
import { IInvite } from "~/redux/interface/invite.interface"

const ListImages = () => (
    <Flex gap={15}>
        <Image
            width={200}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
        <Image
            width={200}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
        <Image
            width={200}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
    </Flex>
)

const BoxSendInvite = () => {
    const dispatch = useDispatch()
    const { userId: receiver } = useParams() // id người nhận

    return (
        <Flex vertical justify="center" align="center">
            <Typography.Text style={{ fontSize: 13, color: "#555" }}>Chater</Typography.Text>
            <Typography.Text style={{ fontSize: 13, color: "#555" }}>
                Các bạn không phải là bạn bè trên Chater
            </Typography.Text>

            <Button
                type="primary"
                style={{ margin: 10 }}
                children={"Gửi lời mời kết bạn"}
                onClick={() => dispatch(inviteActions[inviteTypes.SEND_INVITE](receiver))}
            />
        </Flex>
    )
}

const BoxHandleInviteReceive = ({ invite_id }: { invite_id: IInvite["_id"] }) => {
    const dispatch = useDispatch()

    return (
        <Fragment>
            <Flex vertical justify="center" align="center">
                <Typography.Text style={{ fontSize: 13, color: "#555" }}>Chater</Typography.Text>
                <Typography.Text style={{ fontSize: 13, color: "#555" }}>
                    Đối phương đã gửi cho bạn lời mời
                </Typography.Text>
            </Flex>

            <Flex>
                <Button
                    type="primary"
                    style={{ margin: 10 }}
                    children={"Đồng ý kết bạn"}
                    onClick={() => dispatch(inviteActions[inviteTypes.ACCEPT_INVITE](invite_id))}
                />
                <Button
                    type="primary"
                    danger
                    style={{ margin: 10 }}
                    children={"Từ chối"}
                    // onClick={() => dispatch(userActions[userTypes.ADD_FRIEND](receiver))}
                />
            </Flex>
        </Fragment>
    )
}

const BoxWaitingInvite = () => {
    const dispatch = useDispatch()
    const { userId: receiver } = useParams() // id người nhận

    return (
        <Flex vertical justify="center" align="center">
            <Typography.Text style={{ fontSize: 13, color: "#555" }}>Chater</Typography.Text>
            <Typography.Text style={{ fontSize: 13, color: "#555" }}>
                Đã gửi lời mời kết bạn! Vui lòng chờ phản hồi...
            </Typography.Text>

            <Button
                type="default"
                danger
                style={{ margin: 10 }}
                children={"Thu hồi lời mời kết bạn"}
                // onClick={() => dispatch(userActions[userTypes.ADD_FRIEND](receiver))}
            />
        </Flex>
    )
}

const InfoFriend = () => {
    const { userId } = useParams()
    const dispatch = useDispatch()
    const user = useSelector(selectUser)?.getUser.data
    const picture = user?.picture
    const givenName = user?.givenName
    const current_user_id = useSelector(selectCurrentUser).data?._id

    const isFriend = useSelector(selectCurrentUser).data?.friends.find((f) => f === userId)
    const invite = useSelector(selectInvite).getInvites.data?.filter(
        (i) =>
            (i.sender._id === current_user_id && i.receiver === user?._id) ||
            (i.receiver === current_user_id && i.sender._id === user?._id),
    ) // Tìm lời mời

    // Check được nhận lời mời
    const isReceiveInvite = invite?.some((invite) => current_user_id === invite.receiver) // if true, là lời mời nhận được từ đối phương

    useEffect(() => {
        if (userId) dispatch(userActions[userTypes.GET_USER]({ userId }))
    }, [userId, dispatch])

    console.log("isFriend", isFriend)

    return (
        <Flex vertical justify="space-between" style={{ marginLeft: widthSider, height: "100vh" }}>
            <HeaderChatBox name={givenName} avatar={picture} />

            <Flex vertical flex={1} gap={7} align="center" justify="center" style={{ padding: 50 }}>
                <Flex vertical justify="center" align="center" style={{ marginBottom: 20 }}>
                    <Avatar src={picture || ""} icon={<UserOutlined />} size={80} />
                    <Typography.Text strong style={{ fontSize: 18 }}>
                        {givenName}
                    </Typography.Text>

                    {isFriend && (
                        <Typography.Text style={{ fontSize: 13 }}>Đang hoạt động</Typography.Text>
                    )}
                </Flex>

                {isFriend ? (
                    <Flex vertical flex={1} gap={20}>
                        <Flex gap={40} justify="center" align="center">
                            <Flex
                                vertical
                                gap={7}
                                justify="center"
                                align="center"
                                style={{ cursor: "pointer" }}
                            >
                                <UserOutlined style={{ fontSize: 18 }} />
                                <Typography children="Trang cá nhân" />
                            </Flex>
                            <Flex
                                vertical
                                gap={7}
                                justify="center"
                                align="center"
                                style={{ cursor: "pointer" }}
                            >
                                <BellOutlined style={{ fontSize: 18 }} />
                                <Typography children="Tắt thông báo" />
                            </Flex>
                            <Flex
                                vertical
                                gap={7}
                                justify="center"
                                align="center"
                                style={{ cursor: "pointer" }}
                            >
                                <MessageOutlined style={{ fontSize: 18 }} />
                                <Typography children="Nhắn tin" />
                            </Flex>
                        </Flex>
                        <ListImages />
                    </Flex>
                ) : invite?.length ? (
                    isReceiveInvite ? (
                        <BoxHandleInviteReceive invite_id={invite?.[0]?._id} />
                    ) : (
                        <BoxWaitingInvite />
                    )
                ) : (
                    <BoxSendInvite />
                )}
            </Flex>
        </Flex>
    )
}

export default InfoFriend
