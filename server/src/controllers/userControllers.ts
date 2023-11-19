import { NextFunction, Request, Response } from "express"
import HttpStatusCodes from "http-status-codes"
import UserServices from "../services/userServices"
import { decodeToken } from "../helpers"
import { authorization } from "../utils/variables"

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

    export const search = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.header(authorization)
            const user: any = decodeToken(token)
            const userId = user._id
            const key = req.body.key
            const response = await UserServices.search(key, userId)
            return res.status(HttpStatusCodes.OK).json(response)
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error!")
        }
    }

    export const addFriend = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.header(authorization)
            const user: any = decodeToken(token)
            const myId = user._id
            const friendId = req.body.friendId
            const response = await UserServices.addFriend(myId, friendId)
            return res.status(HttpStatusCodes.OK).json(response)
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error!")
        }
    }
}

export default UserControllers
