import { Fragment, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { io } from "socket.io-client"
import { selectCurrentUser } from "~/redux/selectors"

interface ISocketProvider {
    children: React.ReactNode
}

// socket.on("message-to-server", (message) => {
//     console.log("Tin nhắn từ server:", message)
// })

// export const sendMessage = (data: any) => {
//     socket.emit("sendMessage", data)
// }

const SocketProvider: React.FC<ISocketProvider> = ({ children }) => {
    const [socket, setSocket] = useState<any>(null)

    const currentUser = useSelector(selectCurrentUser).data
    const SERVER_URL = process.env.REACT_APP_SERVER_URL || "*"

    useEffect(() => {
        if (currentUser) {
            const socket = io(SERVER_URL)
            setSocket(socket)

            socket.close()
        } else {
            if (socket) {
                socket.close()
                setSocket(null)
            }
        }
    }, [currentUser])

    return <Fragment>{children}</Fragment>
}

export default SocketProvider
