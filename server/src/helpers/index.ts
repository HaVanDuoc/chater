import jwt from "jsonwebtoken"
import { IUser } from "../models/User"

export const decodeToken = (authorization?: string) => {
    const token = authorization?.split(" ")[1] || "" // tách cái Bearer ra
    const privateKey = process.env.JWT_PRIVATE_KEY || ""

    const user = jwt.verify(token, privateKey, (err, decode) => {
        return decode
    })

    return user
}
