import { NextFunction, Request, Response } from "express"
import HttpStatusCodes from "http-status-codes"
import AuthServices from "../services/authServices"
import axios from "axios"
import { authorization } from "../utils/variables"

namespace AuthControllers {
    export const login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { access_token } = req.body

            const userInfo = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                headers: { [authorization]: `Bearer ${access_token}` },
            })

            const response = await AuthServices.login(userInfo.data)
            return res.status(HttpStatusCodes.OK).json(response)
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error)
        }
    }
}

export default AuthControllers
