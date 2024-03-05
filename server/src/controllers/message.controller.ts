import { NextFunction, Request, Response } from "express"
import HttpStatusCodes from "http-status-codes"
import MessageServices from "../services/message.service"

namespace MessageControllers {
    export const getMessages = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { chatId } = req.params
            const response = await MessageServices.getMessages(chatId)
            return res.status(HttpStatusCodes.OK).json(response)
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error)
        }
    }

    export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body
            const current_user_id = req.user
            data["sender"] = current_user_id
            const response = await MessageServices.sendMessage(data)
            return res.status(HttpStatusCodes.OK).json(response)
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error)
        }
    }
}

export default MessageControllers
