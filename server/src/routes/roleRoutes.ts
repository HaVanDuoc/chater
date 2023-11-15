import { Router } from "express"
import RoleControllers from "../controllers/roleControllers"

const roleRoutes = () => {
    const router = Router()

    router.post("/getOne", RoleControllers.getOne)

    return router
}

export default roleRoutes
