import { Router } from "express"
import SearchControllers from "../controllers/search.controller"

const router = Router()

router.get("/:key", SearchControllers.search)

export default router
