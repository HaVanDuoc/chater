import { Router } from "express"
import UserControllers from "../controllers/user.controller"

const router = Router()

router.get("/:userId", UserControllers.getUser)
router.get("/friend/suggest", UserControllers.getSuggestFriends)
router.get("/friend/list", UserControllers.getListFriends)
router.delete("/friend/:friendId", UserControllers.deleteFriend)

router.get("/getOne/:userId", UserControllers.getOne)


export default router
