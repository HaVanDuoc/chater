import { Router } from "express"
import UserControllers from "../controllers/user.controller"

const router = Router()

router.get("/:userId", UserControllers.getUser)
router.get("/friend/suggest", UserControllers.getSuggestFriends)
router.get("/friend/list", UserControllers.getListFriends)

router.get("/getOne/:userId", UserControllers.getOne)
router.post("/deleteFriend/:userId", UserControllers.deleteFriend)

export default router
