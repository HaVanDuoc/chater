import { NextFunction, Request, Response } from "express"
import { HttpStatusCode } from "axios"

namespace Middlewares {
    export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
        try {
            if (req.isAuthenticated()) {
                next()
            } else {
                return res.status(HttpStatusCode.Unauthorized).json({
                    error: true,
                    message: "Unauthorized",
                })
            }
        } catch (error) {
            console.log("Error authentication", error)
        }
    }
}

export default Middlewares
