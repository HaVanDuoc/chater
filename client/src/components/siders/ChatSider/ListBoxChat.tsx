import { Button, Flex, Popover, Typography } from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import AvatarOnline from "~/components/AvatarOnline"
import { IChat } from "~/redux/interface/chat.interface"
import { selectChat, selectCurrentUser, selectSocket } from "~/redux/selectors"
import ContentPopoverBoxChat from "./ContentPopoverBoxChat"
import { EllipsisOutlined } from "@ant-design/icons"

const ListBoxChat = () => {
    const chats = useSelector(selectChat).getListChat.data

    console.log(chats)

    return (
        <Flex
            vertical
            style={{
                margin: "10px 0px 10px 7px",
                overflowY: "auto",
                flex: 1,
            }}
        >
            {chats && chats.length ? (
                chats.map((chat: IChat, index: number) => {
                    return <BoxChat chat={chat} key={index} />
                })
            ) : (
                <Flex flex={1} justify="center" align="center">
                    <Typography.Title level={5}>Bạn chưa tham gia đoạn chat nào!</Typography.Title>
                </Flex>
            )}
        </Flex>
    )
}

export default ListBoxChat

interface IBoxChat {
    chat: IChat
}

export const getGroupAvatarAndName = (members: any[], current_user_id: any) => {
    if (members.length === 2) {
        // Nếu có 2 thành viên, lấy avatar và tên của thành viên còn lại
        const currentUser = members.find((member) => member._id !== current_user_id)
        return {
            avatar: currentUser.picture,
            name: currentUser.displayName,
        }
    } else {
        // Nếu từ 3 thành viên trở lên, tổng hợp tên các thành viên
        let groupName = members.map((member) => member.displayName).join(" ➔ ")
        // Rút gọn tên nếu quá dài
        if (groupName.length > 20) {
            groupName = groupName.substring(0, 20) + "..."
        }
        return {
            avatar: null, // Đặt avatar cho nhóm ở đây nếu cần
            name: groupName,
        }
    }
}

export const isChatOnline = (members: any, listOnline: any, current_user_id: any) => {
    return members.some(
        (member: any) => listOnline?.includes(member._id) && member._id !== current_user_id,
    )
}

const BoxChat: React.FC<IBoxChat> = ({ chat }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [online, setOnline] = useState(false)

    const { chatId } = useParams()
    const current_user_id = useSelector(selectCurrentUser).data?._id
    const members = chat?.members ?? []
    const { avatar, name } = getGroupAvatarAndName(members, current_user_id)
    const navigate = useNavigate()
    const chat_id = chat._id
    const newestMessage = {
        content: chat?.messages?.[0]?.content,
        time: chat?.messages?.[0]?.createdAt
            ? moment.utc(chat.messages[0].createdAt).locale("vi").fromNow()
            : "",
    }

    const listOnline = useSelector(selectSocket).getOnlineUsers
    useEffect(() => {
        setOnline(isChatOnline(members, listOnline, current_user_id))
    }, [listOnline])

    return (
        <Flex
            align="center"
            gap={10}
            style={{
                position: "relative",
                padding: "10px 10px",
                borderRadius: 5,
                marginRight: 5,
                cursor: "pointer",
                background:
                    chat_id === chatId ? "rgb(221 221 221)" : isHovered ? "#f3f5f5" : "inherit",
            }}
            onMouseEnter={() => {
                setIsHovered(true)
            }}
            onMouseLeave={() => {
                setIsHovered(false)
            }}
            onClick={() => {
                navigate(`/chat/${chat_id}`)
            }}
        >
            <AvatarOnline avt={avatar} online={online} />

            <Flex vertical gap="none">
                <Typography.Text style={{ fontSize: 15, fontWeight: 500 }}>{name}</Typography.Text>
                <Flex align="center">
                    <Typography.Text
                        style={{ fontSize: 12, display: "flex", alignItems: "center" }}
                    >
                        {newestMessage.content
                            ? `${newestMessage.content} - ${newestMessage.time}`
                            : "Chater: Hãy bắt đầu cuộc trò truyện!"}
                    </Typography.Text>
                </Flex>
            </Flex>

            <Popover
                placement="rightTop"
                content={() => ContentPopoverBoxChat(chat_id)}
                trigger="click"
            >
                <Button
                    shape="circle"
                    icon={<EllipsisOutlined />}
                    className="btn-option"
                    style={{
                        position: "absolute",
                        right: 30,
                        display: isHovered ? "block" : "none",
                    }}
                />
            </Popover>
        </Flex>
    )
}
