import express from "express"
import initRoute from "./routes"
import dotenv from "dotenv"
import connectDatabase from "./utils/connectDatabase"
import config from "./config"
import cors from "cors"
import http from "http"
import { Server, Socket } from "socket.io"
import session from "express-session"
import MongoStore from "connect-mongo"
import passport from "passport"

const app = express()

//middleware
dotenv.config()
app.use(express.json())
app.use(cors())
app.use(
    session({
        secret: process.env["SECRET_KEY"] || "*",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({
            mongoUrl: process.env["MONGO_URI"],
        }),
    }),
)
app.use(passport.authenticate("session"))

// Router
initRoute(app)

// Connect to socket
// const server = http.createServer(app)
// const io = new Server(server)

// io.on("connection", (socket: Socket) => {
//     console.log("A user connected")

//     socket.on("disconnect", () => {
//         console.log("Socket disconnected")
//     })
// })

app.listen(config.port, () => {
    console.log(`[server] Server is running at http://localhost:${config.port}`)
    connectDatabase()
})
