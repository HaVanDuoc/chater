import { EllipsisOutlined, PhoneFilled, VideoCameraFilled } from "@ant-design/icons"
import { Button, Flex, Tooltip, Typography } from "antd"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import AvatarOnline from "~/components/AvatarOnline"
import { isChatOnline } from "~/components/siders/ChatSider/ListBoxChat"
import { IChat } from "~/redux/interface/chat.interface"
import { selectChat, selectCurrentUser, selectSocket } from "~/redux/selectors"

interface IHeaderChatBox {
    name?: IChat["name"]
    avatar?: IChat["avatar"]
}

const HeaderChatBox: React.FC<IHeaderChatBox> = ({ name, avatar }) => {
    const { chatId } = useParams()
    const chat = useSelector(selectChat).getListChat.data.find((chat) => chat._id === chatId)
    const members = chat?.members ?? []
    const listOnline = useSelector(selectSocket).getOnlineUsers
    const current_user_id = useSelector(selectCurrentUser).data?._id
    const online = isChatOnline(members, listOnline, current_user_id)

    return (
        <Flex
            align="center"
            justify="space-between"
            style={{
                padding: 8,
                backgroundColor: "#fff",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                zIndex: 99,
            }}
        >
            <Flex gap={7} align="center">
                <AvatarOnline online={online} size={38} avt={avatar} />

                <Flex vertical gap={0}>
                    <Typography style={{ fontSize: 16, fontWeight: 500 }}>{name}</Typography>
                    <Typography style={{ fontSize: 13 }}>
                        {online ? "Đang hoạt động" : "Offline"}
                    </Typography>
                </Flex>
            </Flex>

            <Flex gap={7} align="center">
                <Tooltip title="Phone call">
                    <Button
                        icon={<PhoneFilled style={{ color: "dodgerblue" }} />}
                        type="text"
                        shape="circle"
                        size="large"
                    />
                </Tooltip>
                <Tooltip title="Video call">
                    <Button
                        icon={<VideoCameraFilled style={{ color: "dodgerblue" }} />}
                        type="text"
                        shape="circle"
                        size="large"
                    />
                </Tooltip>
                <Tooltip title="More options">
                    <Button
                        icon={<EllipsisOutlined style={{ color: "dodgerblue" }} />}
                        type="text"
                        shape="circle"
                        size="large"
                    />
                </Tooltip>
            </Flex>
        </Flex>
    )
}

export default HeaderChatBox
