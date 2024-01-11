import { Router } from "express"
import MessageControllers from "../controllers/messageControllers"

const messageRoutes = () => {
    const router = Router()

    router.post("/send", MessageControllers.sendMessage)
    router.get("/:chatId", MessageControllers.fetchMessage)

    return router
}

export default messageRoutes
