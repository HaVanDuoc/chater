import { Router } from "express"
import ChatControllers from "../controllers/chatControllers"

const router = Router()

router.get("/:userId", ChatControllers.getChatByUserId)
router.get("/getChat/:chatId", ChatControllers.getChatById)
router.delete("/:chatId", ChatControllers.deleteChat)

export default router
