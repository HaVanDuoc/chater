import { Router } from "express"
import dotenv from "dotenv"
import InviteController from "../controllers/invite.controller"
import "../config/passport.config"

dotenv.config()

const router = Router()

router.get("/", InviteController.getListInvites)
router.post("/:inviteId/accept", InviteController.acceptInvite)
router.post("/:inviteId/reject", InviteController.rejectInvite)
router.post("/:inviteId/redeem", InviteController.redeemInvite)

export default router
