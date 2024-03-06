import { Fragment, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { io } from "socket.io-client"
import { selectCurrentUser, selectSocket } from "~/redux/selectors"
import { socketActions } from "~/redux/slice/socket.slice"
import { socketTypes } from "~/redux/type/socket.type"

interface ISocketProvider {
    children: React.ReactNode
}

const SocketProvider: React.FC<ISocketProvider> = ({ children }) => {
    const socket = useSelector(selectSocket).socket

    const SERVER_URL = process.env.REACT_APP_SERVER_URL || "*"
    const currentUser = useSelector(selectCurrentUser).data?._id
    const dispatch = useDispatch()

    useEffect(() => {
        if (currentUser && !socket) {
            const socket = io(SERVER_URL, { query: { userId: currentUser } })

            dispatch(socketActions[socketTypes.SET_SOCKET](socket))

            // Socket on get online users
            socket.on("getOnlineUsers", (listOnline) => {
                dispatch(socketActions[socketTypes.GET_ONLINE_USERS](listOnline))
            })

            // Clean up function to close socket when unmounting
            return () => {
                socket.close()
            }
        } else {
            if (socket) {
                socket.close()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser])

    return <Fragment>{children}</Fragment>
}

export default SocketProvider
