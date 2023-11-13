import HttpStatusCodes from "http-status-codes"
import express, { Response } from "express"
import authRoutes from "./authRoutes"

// const app = express()

const initRoute = (app: any) => {
    app.use("/api/auth", authRoutes())

    return app.use((res: Response) => {
        return res.status(HttpStatusCodes.NOT_FOUND).json({ error: "NOT FOUND" })
    })
}

export default initRoute
