import { Router } from "express"
import UserControllers from "../controllers/user.controller"

const router = Router()

router.get("/:userId", UserControllers.getUser)
router.post("/:receiver/add", UserControllers.addFriend) // Send invite add friend

router.get("/getOne/:userId", UserControllers.getOne)
// router.post("/search", UserControllers.search)


router.post("/deleteFriend/:userId", UserControllers.deleteFriend)

export default router
