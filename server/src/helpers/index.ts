import jwt from "jsonwebtoken"
import { IUser } from "../models/User"

export const signToken = (_id: IUser["_id"], name?: IUser["name"]) => {
    const privateKey = process.env.JWT_PRIVATE_KEY

    if (privateKey) {
        const token = jwt.sign({ _id, name }, privateKey)
        return token
    }

    throw new Error("NOT FOUND PRIVATE KEY FOR JWT")
}

export const decodeToken = (authorization?: string) => {
    const token = authorization?.split(" ")[1] || "" // tách cái Bearer ra
    const privateKey = process.env.JWT_PRIVATE_KEY || ""

    const user = jwt.verify(token, privateKey, (err, decode) => {
        return decode
    })

    return user
}
