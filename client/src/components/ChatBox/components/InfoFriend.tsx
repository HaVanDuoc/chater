import { UserOutlined } from "@ant-design/icons"
import { Avatar, Button, Flex, Typography } from "antd"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useParams } from "react-router"
import { selectUser } from "~/redux/selectors"
import { actions as userActions } from "~/redux/slice/user.slice"
import { userTypes } from "~/redux/type/user.type"

const InfoFriend = () => {
    const { userId: receiver } = useParams() // id người nhận
    const user = useSelector(selectUser)?.data
    const picture: any = user?.picture
    const given_name: any = user?.given_name
    const invite = user?.invite
    const dispatch = useDispatch()

    return (
        <Flex vertical flex={1} gap={7} align="center" justify="center" style={{ padding: 50 }}>
            <Avatar src={picture || ""} icon={<UserOutlined />} size={60} />
            <Typography.Text strong style={{ fontSize: 18 }}>
                {given_name}
            </Typography.Text>

            {/* if invite, check is sender or receiver */}
            {invite ? (
                invite.sender === receiver ? (
                    <>
                        <Flex vertical justify="center" align="center">
                            <Typography.Text style={{ fontSize: 13, color: "#555" }}>
                                Chater
                            </Typography.Text>
                            <Typography.Text style={{ fontSize: 13, color: "#555" }}>
                                Đối phương đã gửi cho bạn lời mời
                            </Typography.Text>
                        </Flex>

                        <Flex>
                            <Button
                                type="primary"
                                style={{ margin: 10 }}
                                children={"Đồng ý kết bạn"}
                                onClick={() =>
                                    dispatch(userActions[userTypes.ADD_FRIEND](receiver))
                                }
                            />
                            <Button
                                type="primary"
                                danger
                                style={{ margin: 10 }}
                                children={"Từ chối"}
                                onClick={() =>
                                    dispatch(userActions[userTypes.ADD_FRIEND](receiver))
                                }
                            />
                        </Flex>
                    </>
                ) : (
                    <Flex vertical justify="center" align="center">
                        <Typography.Text style={{ fontSize: 13, color: "#555" }}>
                            Chater
                        </Typography.Text>
                        <Typography.Text style={{ fontSize: 13, color: "#555" }}>
                            Đã gửi lời mời kết bạn! Vui lòng chờ phản hồi...
                        </Typography.Text>

                        <Button
                            type="default"
                            danger
                            style={{ margin: 10 }}
                            children={"Thu hồi lời mời kết bạn"}
                            onClick={() => dispatch(userActions[userTypes.ADD_FRIEND](receiver))}
                        />
                    </Flex>
                )
            ) : (
                <Flex vertical justify="center" align="center">
                    <Typography.Text style={{ fontSize: 13, color: "#555" }}>
                        Chater
                    </Typography.Text>
                    <Typography.Text style={{ fontSize: 13, color: "#555" }}>
                        Các bạn không phải là bạn bè trên Chater
                    </Typography.Text>

                    <Button
                        type="primary"
                        style={{ margin: 10 }}
                        children={"Gửi lời mời kết bạn"}
                        onClick={() => dispatch(userActions[userTypes.ADD_FRIEND](receiver))}
                    />
                </Flex>
            )}
        </Flex>
    )
}

export default InfoFriend
