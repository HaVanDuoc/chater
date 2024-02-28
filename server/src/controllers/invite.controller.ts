import { Request, Response } from "express"
import HttpStatusCodes from "http-status-codes"
import InviteService from "../services/invite.service"

namespace InviteController {
    export const getInvite = async (req: Request, res: Response) => {
        try {
            const current_user_id: any = req.user
            const response = await InviteService.getInvite(current_user_id)
            return res.status(HttpStatusCodes.OK).json(response)
        } catch (error) {
            console.log("Error Get Data Invites - invite.controller.ts - /", error)
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error!")
        }
    }
}

export default InviteController
