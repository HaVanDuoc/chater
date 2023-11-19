import { Router } from "express"
import AuthControllers from "../controllers/authControllers"
import { verifyToken } from "../middlewares"

const authRoutes = () => {
    const router = Router()

    router.post("/login", AuthControllers.login)

    return router
}

export default authRoutes
