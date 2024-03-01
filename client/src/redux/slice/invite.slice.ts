import { createSlice } from "@reduxjs/toolkit"
import { IInvite } from "../interface/invite.interface"
import { inviteTypes } from "../type/invite.type"
import { Status } from "../types"

interface InviteState {
    status: Status
    message?: string
    listInvites?: IInvite[]
}

const initialState: InviteState = {
    status: "idle",
    message: "",
    listInvites: [],
}

const inviteSlice = createSlice({
    name: "invite",
    initialState,
    reducers: {
        // GET LIST INVITES
        [inviteTypes.GET_LIST_INVITES]: (state) => {
            state.status = "pending"
        },
        [inviteTypes.GET_LIST_INVITES_SUCCESS]: (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
            state.listInvites = action.payload.invites
        },
        [inviteTypes.GET_LIST_INVITES_FAILED]: (state, action) => {
            state.status = "failed"
            state.message = action.payload.message
        },

        // Accept invite
        [inviteTypes.ACCEPT_INVITE]: (state) => {
            state.status = "pending"
        },
        [inviteTypes.ACCEPT_INVITE_SUCCESS]: (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
        },
        [inviteTypes.ACCEPT_INVITE_FAILED]: (state, action) => {
            state.status = "failed"
            state.message = action.payload.message
        },

        // Reject invite
        [inviteTypes.REJECT_INVITE]: (state) => {
            state.status = "pending"
        },
        [inviteTypes.REJECT_INVITE_SUCCESS]: (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
        },
        [inviteTypes.REJECT_INVITE_FAILED]: (state, action) => {
            state.status = "failed"
            state.message = action.payload.message
        },
    },
})

export const inviteActions = inviteSlice.actions

const inviteReducer = inviteSlice.reducer

export default inviteReducer
