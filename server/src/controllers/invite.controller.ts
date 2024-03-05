import { Request, Response } from "express"
import HttpStatusCodes from "http-status-codes"
import InviteService from "../services/invite.service"

namespace InviteController {
    // Get list invites
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

    // Send Invite
    export const sendInvite = async (req: Request, res: Response) => {
        try {
            const sender: any = req.user
            const receiver: any = req.params.receiver
            const response = await InviteService.sendInvite(sender, receiver)
            return res.status(HttpStatusCodes.OK).json(response)
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error!")
        }
    }

    // Accept Invite
    export const acceptInvite = async (req: Request, res: Response) => {
        try {
            const invite_id: any = req.params.inviteId
            const current_user_id: any = req.user
            const response = await InviteService.acceptInvite(invite_id, current_user_id)
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
