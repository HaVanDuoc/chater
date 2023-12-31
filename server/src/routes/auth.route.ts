import { Router } from "express"
import AuthControllers from "../controllers/auth.controller"
import passport from "passport"
import dotenv from "dotenv"
import "../config/passport.config"

dotenv.config()

const authRoutes = () => {
    const router = Router()

    router.get("/login/google", passport.authenticate("google"))
    router.get(
        "/oauth2/redirect/google",
        passport.authenticate("google", {
            successRedirect: `${process.env.CLIENT_HOST}/chat`,
            failureRedirect: `${process.env.CLIENT_HOST}/login`,
        }),
    )
    router.get("/logout", AuthControllers.logout)

    return router
}

export default authRoutes
