import { createSlice } from "@reduxjs/toolkit"
import { Status } from "../types"
import { IInvite } from "../interface/invite.interface"
import { types } from "../type/invite.type"

interface InviteState {
    status: Status
    message: string | null
    invites: IInvite[]
}

const initialState: InviteState = {
    status: "idle",
    message: null,
    invites: [],
}

const inviteSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // GET INVITES
        [types.GET_INVITE]: (state) => {
            state.status = "pending"
        },
        [types.GET_INVITE_SUCCEEDED]: (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
            state.invites = action.payload.invites
        },
        [types.GET_INVITE_FAILED]: (state, action) => {
            state.status = "failed"
            state.message = action.payload.message
        },
    },
})

export const actions = inviteSlice.actions

const inviteReducer = inviteSlice.reducer

export default inviteReducer
