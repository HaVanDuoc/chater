import { NextFunction, Request, Response } from "express"
import HttpStatusCodes from "http-status-codes"
import UserServices from "../services/userServices"

namespace UserControllers {
    export const getOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.params.userId
            const response = await UserServices.getOne(userId)
            return res.status(HttpStatusCodes.OK).json(response)
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error!")
        }
    }
}

export default UserControllers
