import { Fragment, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { io } from "socket.io-client"
import { selectChat, selectCurrentUser, selectSocket } from "~/redux/selectors"
import { chatActions } from "~/redux/slice/chat.slice"
import { socketActions } from "~/redux/slice/socket.slice"
import { chatTypes } from "~/redux/type/chat.type"
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

    useEffect(() => {
        if (currentUser && !socket) {
            // Connect socket
            const socket = io(SOCKET_URL, { query: { userId: currentUser } })
            dispatch(socketActions[socketTypes.SET_SOCKET](socket)) // set socket

            // Clean up function to close socket when unmounting
            return () => {
                chats.forEach((chat) => {
                    socket?.emit("leaveRoom", chat._id)
                })
                socket.close() // disconnect socket
            }
        } else if (socket) {
            chats.forEach((chat) => {
                socket?.emit("leaveRoom", chat._id)
            })
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

    // Get online users
    useEffect(() => {
        if (socket) {
            socket.on("getOnlineUsers", (listOnline) => {
                dispatch(socketActions[socketTypes.GET_ONLINE_USERS](listOnline))
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket])

    // Receive message
    useEffect(() => {
        if (socket) {
            socket.on("receiveMessage", ({ room, message }) => {
                dispatch(chatActions[chatTypes.ADD_NEW_MESSAGE]({ chatId: room, message }))
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket])

    return <Fragment>{children}</Fragment>
}

export default SocketProvider
