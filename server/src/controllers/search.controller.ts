import { Request, Response } from "express"
import HttpStatusCodes from "http-status-codes"
import SearchServices from "../services/search.service"

namespace SearchControllers {
    export const search = async (req: Request, res: Response) => {
        try {
            const current_user_id = req.body.decodeToken._id
            const key = req.body.key
            const response = await SearchServices.search(key, current_user_id)
            return res.status(HttpStatusCodes.OK).json(response)
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error!")
        }
    }

    export const suggest = async (req: Request, res: Response) => {
        try {
            const user_id = req.user
            const response = await SearchServices.suggest(user_id)
            return res.status(HttpStatusCodes.OK).json(response)
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error!")
        }
    }
}

export default SearchControllers
