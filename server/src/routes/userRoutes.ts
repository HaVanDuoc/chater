import { Router } from "express"
import UserControllers from "../controllers/userControllers"
import { verifyToken } from "../middlewares"

const userRoutes = () => {
    const router = Router()

    // middleware
    router.use(verifyToken)

    router.post("/getUser", UserControllers.getUser)
    router.get("/getOne/:userId", UserControllers.getOne)
    router.post("/search", UserControllers.search)

    router.post("/requestFriend", UserControllers.requestFriend)
    router.post("/requestFriend/accept", UserControllers.acceptInviteRequestFriend)
    router.post("/requestFriend/reject", UserControllers.rejectInviteRequestFriend)

    router.post("/deleteFriend/:userId", UserControllers.deleteFriend)

    return router
}

export default userRoutes
