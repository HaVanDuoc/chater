import { Server, Socket } from "socket.io"

interface IUserSocketMap {
    [userId: string]: string
}

const userSocketMap: IUserSocketMap = {}

const socket = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log("[socket] A user connected", socket.id)

        const userId = socket.handshake.query.userId as string
        if (userId && userId != "undefined" && userId !== "null" && userId.trim() !== "") {
            userSocketMap[userId] = socket.id

            // emit get online users
            io.emit("getOnlineUsers", Object.keys(userSocketMap))
        }

        socket.on("sendMessage", (message) => {
            console.log("Tin nhắn mới từ máy khách:", message)
            io.emit("message-to-server", message)
        })

        // socket disconnect
        socket.on("disconnect", () => {
            // console.log("[socket] User disconnected", socket.id)

            if (userId) {
                delete userSocketMap[userId]
                // console.log("userSocketMap", userSocketMap)
                io.emit("getOnlineUsers", Object.keys(userSocketMap))
            }
        })
    })
}

export default socket
