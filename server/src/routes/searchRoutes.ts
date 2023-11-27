import { Router } from "express"
import SearchControllers from "../controllers/searchControllers"
import { verifyToken } from "../middlewares"

const searchRoutes = () => {
    const router = Router()

    router.use(verifyToken)

    router.post("/", SearchControllers.search)

    return router
}

export default searchRoutes
