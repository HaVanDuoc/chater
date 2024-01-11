import { Router } from "express"
import SearchControllers from "../controllers/searchControllers"

const searchRoutes = () => {
    const router = Router()

    router.post("/", SearchControllers.search)

    return router
}

export default searchRoutes
