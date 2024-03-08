import express from "express"
import { createServer } from "node:http"

import cors from "cors"
import dotenv from "dotenv"
import { Server, Socket } from "socket.io"

dotenv.config()

const CLIENT_URL = process.env.CLIENT_URL || "*"
const SERVER_URL = process.env.SERVER_URL || "*"
const corsOptions = {
    origin: [CLIENT_URL, SERVER_URL],
    credentials: true,
}

const app = express()
const server = createServer(app)
const io = new Server(server, { cors: corsOptions })

const port = process.env.PORT

//middleware
app.use(
    cors({
        origin: [CLIENT_URL, SERVER_URL],
        credentials: true,
    }),
)

interface IUserSocketMap {
    [userId: string]: string
}
interface IRoomSocketMap {
    [chatId: string]: { [userId: string]: string }[]
}

const userSocketMap: IUserSocketMap = {} // Contain users active
const roomSocketMap: IRoomSocketMap = {} // Contain chats active

io.on("connection", (socket: Socket) => {
    console.log("[socket] A user connected", socket.id)

    const userId = socket.handshake.query.userId as string
    if (userId && userId != "undefined" && userId !== "null" && userId.trim() !== "") {
        userSocketMap[userId] = socket.id
        // emit get online users
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    }

    // Join room
    socket.on("joinRoom", (room: any) => {
        if (room) {
            console.log("[socket] A user join room", room)

            socket.join(room)

            if (!roomSocketMap[room]) {
                roomSocketMap[room] = []
            }

            // Kiểm tra xem userId đã tồn tại trong mảng chưa
            const existingUserIndex = roomSocketMap[room].findIndex(
                (user) => user.userId === userId,
            )
            if (existingUserIndex === -1) {
                // Nếu userId chưa tồn tại, thêm nó vào mảng
                roomSocketMap[room].push({ userId, socketId: socket.id })
            } else {
                // Nếu userId đã tồn tại, bạn có thể cập nhật thông tin của socket tại đây
                roomSocketMap[room][existingUserIndex].socketId = socket.id
            }
        }
    })

    socket.on("sendMessage", ({ room, message }) => {
        if (room && message) {
            console.log(`Tin nhắn mới từ phòng ${room}`, message)
            // Emit message to all members in room
            io.to(room).emit("receiveMessage", { room, message })
        }
    })

    socket.on("leaveRoom", (room: any) => {
        if (room) {
            console.log("[socket] A user leave room", room)
            
            socket.leave(room)

            // Kiểm tra xem room có tồn tại trong roomSocketMap hay chưa
            if (roomSocketMap[room]) {
                // Lọc ra những user còn lại, loại bỏ user hiện tại
                roomSocketMap[room] = roomSocketMap[room].filter(
                    (userSocket) => userSocket[userId] !== socket.id,
                )

                // Nếu room không còn user nào, có thể xóa room khỏi roomSocketMap
                if (roomSocketMap[room].length === 0) {
                    delete roomSocketMap[room]
                }
            }
        }
    })

    // socket disconnect
    socket.on("disconnect", () => {
        console.log("[socket] User disconnected", socket.id)

        if (userId) {
            delete userSocketMap[userId]
            io.emit("getOnlineUsers", Object.keys(userSocketMap))
        }
    })
})

server.listen(port, () => {
    console.log(`[socket] Socket is running at http://localhost:${port}`)
})
