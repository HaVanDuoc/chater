import HttpStatusCodes from "http-status-codes"
import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { authorization } from "../utils/variables"

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header(authorization) || ""
        const splitToken = token?.split(" ")[1] // tách cái Bearer ra
        const privateKey = process.env.JWT_PRIVATE_KEY || ""

        jwt.verify(splitToken, privateKey, (err, user) => {
            if (err) {
                return res
                    .status(HttpStatusCodes.UNAUTHORIZED)
                    .json({ message: "Phiên đăng nhập hết hạn. Yêu cầu đăng nhập lại" })
            } else {
                req.body.decodeToken = user
                return next()
            }
        })
    } catch (error: any) {
        throw new Error(error)
    }
}
