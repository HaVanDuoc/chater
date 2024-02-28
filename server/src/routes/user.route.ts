import { Router } from "express"
import UserControllers from "../controllers/user.controller"
import Middlewares from "../middlewares"

const router = Router()

// middleware
// router.use(Middlewares.isAuthenticated)

router.get("/:userId", UserControllers.getUser)

router.get("/getOne/:userId", UserControllers.getOne)
// router.post("/search", UserControllers.search)

router.post("/:receiver/add", UserControllers.addFriend) // Send invite add friend
router.post("/requestFriend/accept", UserControllers.acceptInviteRequestFriend)
router.post("/requestFriend/reject", UserControllers.rejectInviteRequestFriend)

router.post("/deleteFriend/:userId", UserControllers.deleteFriend)

export default router
