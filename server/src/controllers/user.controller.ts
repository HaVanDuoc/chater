import { NextFunction, Request, Response } from "express"
import HttpStatusCodes from "http-status-codes"
import UserServices from "../services/user.service"
import { decodeToken } from "../helpers"
import { authorization } from "../utils/variables"
namespace UserControllers {
    export const getUser = async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId
            const response = await UserServices.getUser(userId)
            return res.status(HttpStatusCodes.OK).json(response)
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error!")
        }
    }

    export const addFriend = async (req: Request, res: Response) => {
        try {
            const sender: any = req.user
            const receiver: any = req.params.receiver
            const response = await UserServices.addFriend(sender, receiver)
            return res.status(HttpStatusCodes.OK).json(response)
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error!")
        }
    }

    export const getOne = async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId
            const response = await UserServices.getOne(userId)
            return res.status(HttpStatusCodes.OK).json(response)
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error!")
        }
    }

    export const search = async (req: Request, res: Response) => {
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

    export const acceptInviteRequestFriend = async (req: Request, res: Response) => {
        try {
            const invite = req.body.invite
            const response = await UserServices.acceptInviteRequestFriend(invite)
            return res.status(HttpStatusCodes.OK).json(response)
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error!")
        }
    }

    export const rejectInviteRequestFriend = async (req: Request, res: Response) => {
        try {
            const invite = req.body.invite
            const response = await UserServices.rejectInviteRequestFriend(invite)
            return res.status(HttpStatusCodes.OK).json(response)
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error!")
        }
    }

    export const deleteFriend = async (req: Request, res: Response) => {
        try {
            const current_user_id = req.body.decodeToken._id
            const { userId: others_id } = req.params
            const response = await UserServices.deleteFriend(current_user_id, others_id)
            return res.status(HttpStatusCodes.OK).json(response)
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error!")
        }
    }
}

export default UserControllers
