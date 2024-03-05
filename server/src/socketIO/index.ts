import { Server, Socket } from "socket.io"

const socket = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log("[socket] A user connected", socket.id)

        socket.on("sendMessage", (message) => {
            console.log("Tin nhắn mới từ máy khách:", message)
            io.emit("message-to-server", message)
        })
    })

    io.on("disconnect", (socket: Socket) => {
        console.log("[socket] User disconnected", socket.id)
    })
}

export default socket
