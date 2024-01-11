import { NextFunction, Request, Response } from "express"
import dotenv from "dotenv"
import { HttpStatusCode } from "axios"
dotenv.config()

namespace AuthControllers {
    export const login = (req: Request, res: Response, next: NextFunction) => {
        const user: any = req.user

        const access_token = user.access_token
        localStorage.setItem("access_token", access_token)
        return res.status(HttpStatusCode.Ok).send({ message: "Login Successful", data: user })
    }

    export const logout = (req: Request, res: Response, next: NextFunction) => {
        req.logout((err) => {
            if (err) {
                return next(err)
            }
            window.localStorage.removeItem("access_token")
            res.send({ message: "Logout successful" })
        })
    }
}

export default AuthControllers
