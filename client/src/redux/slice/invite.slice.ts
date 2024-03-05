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
    }
    acceptInvite: {
        status: Status
        message: String | null
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
    },
    acceptInvite: {
        status: "idle",
        message: null,
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
        },
        [inviteTypes.ACCEPT_INVITE_FAILED]: (state, action) => {
            state.acceptInvite.status = "failed"
            state.acceptInvite.message = action.payload.message
        },

        // // Reject invite
        // [inviteTypes.REJECT_INVITE]: (state) => {
        //     state.status = "pending"
        // },
        // [inviteTypes.REJECT_INVITE_SUCCESS]: (state, action) => {
        //     state.status = "succeeded"
        //     state.message = action.payload.message
        // },
        // [inviteTypes.REJECT_INVITE_FAILED]: (state, action) => {
        //     state.status = "failed"
        //     state.message = action.payload.message
        // },
    },
})

export const inviteActions = inviteSlice.actions

const inviteReducer = inviteSlice.reducer

export default inviteReducer
