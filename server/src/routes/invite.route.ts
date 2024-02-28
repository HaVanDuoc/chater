import { Request, Response, Router } from "express"
import passport from "passport"
import dotenv from "dotenv"
import "../config/passport.config"
import { HttpStatusCode } from "axios"
import User from "../models/User"
import Middlewares from "../middlewares"
import Invite from "../models/Invite"
import InviteController from "../controllers/invite.controller"

dotenv.config()

const router = Router()

// router.use(Middlewares.isAuthenticated)

router.get("/", InviteController.getInvite)

export default router
