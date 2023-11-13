import { NextFunction, Request, Response } from "express"
import HttpStatusCodes from "http-status-codes"
import AuthServices from "../services/authServices"

namespace AuthControllers {
    export const login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("auth controllers")
            const response = await AuthServices.login()
            return res.status(HttpStatusCodes.OK).json(response)
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error!")
        }
    }
}

export default AuthControllers
