import { NextFunction, Request, Response } from "express"
import HttpStatusCodes from "http-status-codes"
import AuthServices from "../services/authServices"
import MessageServices from "../services/messageServices"

namespace MessageControllers {
    export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body
            const current_user_id = req.body.decodeToken._id
            data["sender"] = current_user_id
            console.log('sender', current_user_id)
            const response = await MessageServices.sendMessage(data)
            return res.status(HttpStatusCodes.OK).json(response)
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error)
        }
    }
    export const fetchMessage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { chatId } = req.params
            const response = await MessageServices.fetchMessage(chatId)
            return res.status(HttpStatusCodes.OK).json(response)
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error)
        }
    }
}

export default MessageControllers
