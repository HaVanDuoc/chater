import { Router } from "express"
import MessageControllers from "../controllers/message.controller"

const router = Router()

router.get("/:chatId", MessageControllers.getMessages)
router.post("/send", MessageControllers.sendMessage)

export default router
