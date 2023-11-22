import { Router } from "express"
import ChatControllers from "../controllers/chatControllers"

const chatRoutes = () => {
    const router = Router()

    router.get("/:userId", ChatControllers.getByUserId)
    router.get("/getChat/:chatId", ChatControllers.getChatById)

    return router
}

export default chatRoutes
