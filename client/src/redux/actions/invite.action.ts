import { createAction } from "@reduxjs/toolkit"
import { inviteTypes } from "../type/invite.type"
import { IInvite } from "../interface/invite.interface"
import { IUser } from "../interface/user.interface"

export const getListInvites = () => {
    return createAction(inviteTypes.GET_LIST_INVITES)()
}

export const sendInvite = (user_id: IUser["_id"]) => {
    return createAction<IUser["_id"]>(inviteTypes.SEND_INVITE)(user_id)
}

export const acceptInvite = (invite_id: IInvite["_id"]) => {
    return createAction(inviteTypes.ACCEPT_INVITE)(invite_id)
}

export const rejectInvite = (invite_id: IInvite["_id"]) => {
    return createAction(inviteTypes.REJECT_INVITE)(invite_id)
}

export const redeemInvite = (invite_id: IInvite["_id"]) => {
    return createAction(inviteTypes.REDEEM_INVITE)(invite_id)
}
