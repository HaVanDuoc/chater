import { Request, Response } from "express"
import HttpStatusCodes from "http-status-codes"
import ChatServices from "../services/chat.service"

namespace ChatControllers {
    export const getListChats = async (req: Request, res: Response) => {
        try {
            const auth_id = req.user
            const response = await ChatServices.getListChats(auth_id)
            return res.status(HttpStatusCodes.OK).json(response)
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error!")
        }
    }

    export const getChat = async (req: Request, res: Response) => {
        try {
            const { chatId } = req.params
            const response = await ChatServices.getChat(chatId)
            return res.status(HttpStatusCodes.OK).json(response)
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error!")
        }
    }

    export const getChatByUserId = async (req: Request, res: Response) => {
        try {
            const current_user_id = req.user
            const { userId: other_user_id } = req.params
            console.log("other_user_id", other_user_id)
            console.log("current_user_id", current_user_id)
            const response = await ChatServices.getChatByUserId(current_user_id, other_user_id)
            return res.status(HttpStatusCodes.OK).json(response)
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error!")
        }
    }

    export const deleteChat = async (req: Request, res: Response) => {
        try {
            const { chatId } = req.params
            const response = await ChatServices.deleteChat(chatId)
            return res.status(HttpStatusCodes.OK).json(response)
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error!")
        }
    }
}

export default ChatControllers
