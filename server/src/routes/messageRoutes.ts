import { Router } from "express"
import { verifyToken } from "../middlewares"
import MessageControllers from "../controllers/messageControllers"

const messageRoutes = () => {
    const router = Router()

    router.use(verifyToken)

    router.post("/send", MessageControllers.sendMessage)
    router.get("/:chatId", MessageControllers.fetchMessage)

    return router
}

export default messageRoutes
