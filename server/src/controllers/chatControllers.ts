import { NextFunction, Request, Response } from "express"
import HttpStatusCodes from "http-status-codes"
import AuthServices from "../services/authServices"
import axios from "axios"
import RoleServices from "../services/rolesServices"
import ChatServices from "../services/chatServices"

namespace ChatControllers {
    export const getByUserId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.params
            const response = await ChatServices.getByUserId(userId)
            return res.status(HttpStatusCodes.OK).json(response)
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error!")
        }
    }

    export const getChatById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { chatId } = req.params
            const response = await ChatServices.getChatById(chatId)
            return res.status(HttpStatusCodes.OK).json(response)
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error!")
        }
    }
}

export default ChatControllers
