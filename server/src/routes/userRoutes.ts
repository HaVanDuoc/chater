import { Router } from "express"
import UserControllers from "../controllers/userControllers"

const userRoutes = () => {
    const router = Router()

    router.get("/getOne/:userId", UserControllers.getOne)
    router.post("/search", UserControllers.search)

    return router
}

export default userRoutes
