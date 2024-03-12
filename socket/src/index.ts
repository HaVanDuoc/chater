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

// Function find socket id by userId
const findSocketIdByUserId = (userId: any) => {
    return userSocketMap[userId]
}

io.on("connection", (socket: Socket) => {
    console.log("[socket] A user connected", socket.id)

    const userId = socket.handshake.query.userId as string

    // Emit get online users
    if (userId && userId != "undefined" && userId !== "null" && userId.trim() !== "") {
        userSocketMap[userId] = socket.id
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    }

    // On join room
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

    // On leave room
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

    // On send message
    socket.on("sendMessage", ({ room, message }) => {
        if (room && message) {
            // console.log(`Tin nhắn mới từ phòng ${room}`, message)
            // Emit message to all members in room
            io.to(room).emit("receiveMessage", { room, message })
        }
    })

    // On invite
    socket.on("sendInvite", (invite: any) => {
        if (invite) {
            console.log("A invite has been sent", invite)
            // Xác định người nhận
            const receiverSocketId = findSocketIdByUserId(invite?.receiver)
            console.log("receiverSocketId", receiverSocketId)
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("receiveInvite", invite) // Gửi cho đối phương
            }
            io.to(socket.id).emit("receiveInvite", invite) // Và gửi cho chính mình
        }
    })

    // On accept invite
    socket.on("acceptInvite", ({ invite, chat }: any) => {
        console.log("A invite has been sent", invite)
        // Xác định người nhận
        const receiverSocketId = findSocketIdByUserId(invite?.receiver)
        console.log("receiverSocketId", receiverSocketId)

        const friend_id = invite?.sender

        if (receiverSocketId && !chat.group) {
            console.log("true", receiverSocketId)
            io.to(receiverSocketId).emit("acceptInvite", { chat, friend_id }) // Gửi cho đối phương
        }
        io.to(socket.id).emit("acceptInvite", { chat, friend_id }) // Và gửi cho chính mình
    })

    // On reject invite
    socket.on("rejectInvite", (sender_id: any) => {
        // Xác định người nhận
        const receiverSocketId = findSocketIdByUserId(sender_id)

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("rejectInvite") // Gửi cho đối phương
        }
        io.to(socket.id).emit("rejectInvite") // Và gửi cho chính mình
    })

    // On delete friend
    socket.on("deleteFriend", (friend: any) => {
        if (friend) {
            const chat_id = friend.chat_id
            const friend_id = friend.friend_id

            // Xác định người nhận
            const receiverSocketId = findSocketIdByUserId(friend_id)
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("deleteFriend", friend_id) // Gửi cho đối phương
            }
            io.to(socket.id).emit("deleteFriend", friend_id) // Và gửi cho chính mình
        }
    })

    // socket disconnect
    socket.on("disconnect", () => {
        console.log("[socket] User disconnected", socket.id)

        if (userId) {
            delete userSocketMap[userId]
            console.log("userSocketMap", userSocketMap)
            io.emit("getOnlineUsers", Object.keys(userSocketMap))
        }
    })
})

server.listen(port, () => {
    console.log(`[socket] Socket is running at http://localhost:${port}`)
})
