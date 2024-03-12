import { Fragment, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { io } from "socket.io-client"
import { getListChats } from "~/redux/actions/chat.action"
import { getListInvites } from "~/redux/actions/invite.action"
import { getUser } from "~/redux/actions/user.action"
import { selectChat, selectCurrentUser, selectSocket } from "~/redux/selectors"
import { chatActions } from "~/redux/slice/chat.slice"
import { currentUserActions } from "~/redux/slice/currentUser.slice"
import { socketActions } from "~/redux/slice/socket.slice"
import { chatTypes } from "~/redux/type/chat.type"
import { currentUserTypes } from "~/redux/type/currentUser.type"
import { socketTypes } from "~/redux/type/socket.type"

interface ISocketProvider {
    children: React.ReactNode
}

const SocketProvider: React.FC<ISocketProvider> = ({ children }) => {
    const socket = useSelector(selectSocket).socket
    const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "*"
    const currentUser = useSelector(selectCurrentUser).data?._id
    const chats = useSelector(selectChat).getListChat.data
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (currentUser && !socket) {
            // Connect socket
            const socket = io(SOCKET_URL, { query: { userId: currentUser } })
            dispatch(socketActions[socketTypes.SET_SOCKET](socket)) // set socket

            // Get online users
            socket.on("getOnlineUsers", (listOnline) => {
                dispatch(socketActions[socketTypes.GET_ONLINE_USERS](listOnline))
            })

            // Receive message
            socket.on("receiveMessage", ({ room, message }) => {
                dispatch(chatActions[chatTypes.ADD_NEW_MESSAGE]({ chatId: room, message }))
            })

            // Receive reject invite
            socket.on("rejectInvite", () => {
                dispatch(getListInvites())
            })

            // On delete friend
            socket.on("deleteFriend", (friend_id) => {
                dispatch(currentUserActions[currentUserTypes.DELETE_FRIEND_STORE](friend_id))
                dispatch(getListChats())
            })

            // Receive invite
            socket.on("receiveInvite", () => {
                dispatch(getListInvites())
            })

            // On Accept invite
            socket.on("acceptInvite", async ({ chat, friend_id }) => {
                console.log("On duoc accept invite")
                dispatch(getListInvites())
                dispatch(getListChats())
                dispatch(getUser(friend_id))

                if (friend_id !== currentUser) {
                    navigate(`/chat/${chat._id}`)
                }
            })

            // Clean up function to close socket when unmounting
            return () => {
                socket.close() // disconnect socket
            }
        } else if (socket) {
            socket.close()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser])

    // Join room
    useEffect(() => {
        if (chats.length && socket) {
            // Join room
            chats.forEach((chat) => {
                socket.emit("joinRoom", chat._id)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chats])

    return <Fragment>{children}</Fragment>
}

export default SocketProvider
