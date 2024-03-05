import { Response } from "express"
import authRoutes from "./auth.route"
import userRoutes from "./user.route"
import chatRoutes from "./chat.route"
import messageRoutes from "./message.route"
import searchRoutes from "./search.route"
import inviteRoutes from "./invite.route"
import { HttpStatusCode } from "axios"
import Middlewares from "../middlewares"

const initRoute = (app: any) => {
    app.use("/api/auth", authRoutes)

    app.use(Middlewares.isAuthenticated)
    
    app.use("/api/user", userRoutes)
    app.use("/api/chat", chatRoutes)
    app.use("/api/message", messageRoutes)
    app.use("/api/search", searchRoutes)
    app.use("/api/invite", inviteRoutes)

    return app.use((req: Request, res: Response) => {
        return res.status(HttpStatusCode.NotFound).json({ error: true, message: "NOT FOUND" })
    })
}

export default initRoute
