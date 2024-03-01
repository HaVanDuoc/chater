import { Router } from "express"
import ChatControllers from "../controllers/chat.controller"

const router = Router()

router.get("/", ChatControllers.getListChats)
router.get("/:chatId", ChatControllers.getChat)

router.get("/:userId", ChatControllers.getChatByUserId)
router.delete("/:chatId", ChatControllers.deleteChat)

export default router
