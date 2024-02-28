import { NextFunction, Request, Response } from "express"
import dotenv from "dotenv"
import { HttpStatusCode } from "axios"
dotenv.config()

namespace AuthControllers {
    export const logout = (req: Request, res: Response, next: NextFunction) => {
        req.logout((err) => {
            if (err) {
                return next(err)
            }
            res.send({ message: "Logout successful" })
        })
    }
}

export default AuthControllers
