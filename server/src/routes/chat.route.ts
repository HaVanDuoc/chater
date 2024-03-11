import { Router } from "express"
import ChatControllers from "../controllers/chat.controller"

const router = Router()

router.get("/", ChatControllers.getListChats)
router.delete("/:chatId", ChatControllers.deleteChat)

// router.get("/:userId", ChatControllers.getChatByUserId)
// router.get("/:chatId", ChatControllers.getChat)

export default router
