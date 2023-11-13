import { Router } from "express"
import AuthControllers from "../controllers/authControllers"

const authRoutes = () => {
    const router = Router()

    router.post("/login", AuthControllers.login)

    return router
}

export default authRoutes
