import HttpStatusCodes from "http-status-codes"
import { Response } from "express"
import authRoutes from "./authRoutes"
import roleRoutes from "./roleRoutes"

const initRoute = (app: any) => {
    app.use("/api/auth", authRoutes())
    app.use("/api/role", roleRoutes())

    return app.use((res: Response) => {
        return res.status(HttpStatusCodes.NOT_FOUND).json({ error: "NOT FOUND" })
    })
}

export default initRoute
