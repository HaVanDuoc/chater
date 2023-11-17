import express from "express"
import initRoute from "./routes"
import dotenv from "dotenv"
import connectDB from "./utils/connectDB"
import config from "./config"
import cors from "cors"
import { createServer } from "node:http"
import { Server } from "socket.io"

//middleware
const app = express()
app.use(express.json())
app.use(cors({ origin: [config.clientHost] }))
dotenv.config()

// Router
initRoute(app)

// Connect to socket
const server = createServer(app)
const io = new Server(server)

io.on("connection", (socket) => {
    console.log("A user connected")

    socket.on("disconnect", () => {
        console.log("Socket disconnected")
    })
})

server.listen(config.port, () => {
    console.log(`Server is running at http://localhost:${config.port}`)
    connectDB()
})
