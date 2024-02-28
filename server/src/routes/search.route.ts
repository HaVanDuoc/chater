import { Router } from "express"
import SearchControllers from "../controllers/search.controller"
import Middlewares from "../middlewares"

const router = Router()

router.post("/", SearchControllers.search)
router.get("/suggest", [Middlewares.isAuthenticated], SearchControllers.suggest)

export default router
