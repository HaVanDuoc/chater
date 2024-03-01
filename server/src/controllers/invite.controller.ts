import { Request, Response } from "express"
import HttpStatusCodes from "http-status-codes"
import InviteService from "../services/invite.service"

namespace InviteController {
    export const getListInvites = async (req: Request, res: Response) => {
        try {
            const auth_id: any = req.user
            const response = await InviteService.getListInvites(auth_id)
            return res.status(HttpStatusCodes.OK).json(response)
        } catch (error) {
            console.log("Error Get Data Invites - invite.controller.ts - /", error)
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error!")
        }
    }

    export const acceptInvite = async (req: Request, res: Response) => {
        try {
            const invite_id: any = req.params.inviteId
            const response = await InviteService.acceptInvite(invite_id)
            return res.status(HttpStatusCodes.OK).json(response)
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error!")
        }
    }

    export const rejectInvite = async (req: Request, res: Response) => {
        try {
            const invite = req.body.invite
            const response = await InviteService.rejectInvite(invite)
            return res.status(HttpStatusCodes.OK).json(response)
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error!")
        }
    }

    export const redeemInvite = async (req: Request, res: Response) => {
        try {
            const invite_id: any = req.params.inviteId
            const response = await InviteService.redeemInvite(invite_id)
            return res.status(HttpStatusCodes.OK).json(response)
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error!")
        }
    }
}

export default InviteController
