import { Server } from "socket.io"

const socket = (io: Server) => {
    io.on("connection", (socket) => {
        console.log("a user connected")
    })
}

export default socket
