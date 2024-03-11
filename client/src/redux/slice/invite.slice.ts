import { createSlice } from "@reduxjs/toolkit"
import { IInvite } from "../interface/invite.interface"
import { inviteTypes } from "../type/invite.type"
import { Status } from "../types"

interface InviteState {
    getInvites: {
        status: Status
        message: string | null
        data: IInvite[] | null
    }
    sendInvite: {
        status: Status
        message: string | null
        data: IInvite | null
    }
    acceptInvite: {
        status: Status
        message: String | null
        data: IInvite | null
    }
    rejectInvite: {
        status: Status
        message: String | null
        data: IInvite | null
    }
    redeemInvite: {
        status: Status
        message: String | null
        data: IInvite | null
    }
}

const initialState: InviteState = {
    getInvites: {
        status: "idle",
        message: null,
        data: null,
    },
    sendInvite: {
        status: "idle",
        message: null,
        data: null,
    },
    acceptInvite: {
        status: "idle",
        message: null,
        data: null,
    },
    rejectInvite: {
        status: "idle",
        message: null,
        data: null,
    },
    redeemInvite: {
        status: "idle",
        message: null,
        data: null,
    },
}

const inviteSlice = createSlice({
    name: "invite",
    initialState,
    reducers: {
        // GET LIST INVITES
        [inviteTypes.GET_LIST_INVITES]: (state) => {
            state.getInvites.status = "pending"
        },
        [inviteTypes.GET_LIST_INVITES_SUCCESS]: (state, action) => {
            state.getInvites.status = "succeeded"
            state.getInvites.message = action.payload.message
            state.getInvites.data = action.payload.invites
        },
        [inviteTypes.GET_LIST_INVITES_FAILED]: (state, action) => {
            state.getInvites.status = "failed"
            state.getInvites.message = action.payload.message
        },

        // Send invite
        [inviteTypes.SEND_INVITE]: (state, action) => {
            console.log("state", state)
            state.sendInvite.status = "pending"
        },
        [inviteTypes.SEND_INVITE_SUCCESS]: (state, action) => {
            state.sendInvite.status = "succeeded"
            state.sendInvite.message = action.payload.message
            state.sendInvite.data = action.payload.data
        },
        [inviteTypes.SEND_INVITE_FAILED]: (state, action) => {
            state.sendInvite.status = "failed"
            state.sendInvite.message = action.payload.message
        },

        // Accept invite
        [inviteTypes.ACCEPT_INVITE]: (state) => {
            state.acceptInvite.status = "pending"
        },
        [inviteTypes.ACCEPT_INVITE_SUCCESS]: (state, action) => {
            state.acceptInvite.status = "succeeded"
            state.acceptInvite.message = action.payload.message
            state.acceptInvite.data = action.payload.data
        },
        [inviteTypes.ACCEPT_INVITE_FAILED]: (state, action) => {
            state.acceptInvite.status = "failed"
            state.acceptInvite.message = action.payload.message
        },

        // Reject invite
        [inviteTypes.REJECT_INVITE]: (state) => {
            state.rejectInvite.status = "pending"
        },
        [inviteTypes.REJECT_INVITE_SUCCESS]: (state, action) => {
            state.rejectInvite.status = "succeeded"
            state.rejectInvite.message = action.payload.message
            state.rejectInvite.data = action.payload.data
        },
        [inviteTypes.REJECT_INVITE_FAILED]: (state, action) => {
            state.rejectInvite.status = "failed"
            state.rejectInvite.message = action.payload.message
        },

        // Redeem invite
        [inviteTypes.REDEEM_INVITE]: (state) => {
            state.redeemInvite.status = "pending"
        },
        [inviteTypes.REDEEM_INVITE_SUCCESS]: (state, action) => {
            state.redeemInvite.status = "succeeded"
            state.redeemInvite.message = action.payload.message
            state.redeemInvite.data = action.payload.data
        },
        [inviteTypes.REDEEM_INVITE_FAILED]: (state, action) => {
            state.redeemInvite.status = "failed"
            state.redeemInvite.message = action.payload.message
        },
    },
})

export const inviteActions = inviteSlice.actions

const inviteReducer = inviteSlice.reducer

export default inviteReducer
