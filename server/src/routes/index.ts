import HttpStatusCodes from "http-status-codes"
import { Response } from "express"
import authRoutes from "./authRoutes"
import roleRoutes from "./roleRoutes"
import userRoutes from "./userRoutes"
import chatRoutes from "./chatRoutes"
import messageRoutes from "./messageRoutes"
import searchRoutes from "./searchRoutes"

const initRoute = (app: any) => {
    app.use("/api/auth", authRoutes())
    app.use("/api/role", roleRoutes())
    app.use("/api/user", userRoutes())
    app.use("/api/chat", chatRoutes())
    app.use("/api/message", messageRoutes())
    app.use("/api/search", searchRoutes())

    return app.use((res: Response) => {
        return res.status(HttpStatusCodes.NOT_FOUND).json({ error: "NOT FOUND" })
    })
}

export default initRoute
