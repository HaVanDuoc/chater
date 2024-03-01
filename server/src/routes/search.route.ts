import { Router } from "express"
import SearchControllers from "../controllers/search.controller"

const router = Router()

router.post("/", SearchControllers.search)
router.get("/suggest", SearchControllers.suggest)

export default router
