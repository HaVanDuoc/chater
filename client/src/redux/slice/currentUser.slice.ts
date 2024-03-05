import { createSlice } from "@reduxjs/toolkit"
import { Status } from "../types"
import { IUser } from "../interface/user.interface"
import { currentUserTypes } from "../type/currentUser.type"

interface CurrentUserState {
    status: Status
    message: string
    data: IUser | null
}

const initialState: CurrentUserState = {
    status: "idle",
    message: "",
    data: null,
}

const currentUserSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        [currentUserTypes.CHECK_SESSION]: (state) => {
            state.status = "pending"
        },
        [currentUserTypes.CHECK_SESSION_SUCCESS]: (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
            state.data = action.payload.user
        },
        [currentUserTypes.CHECK_SESSION_FAILED]: (state, action) => {
            state.status = "failed"
            state.message = action.payload.message
        },
    },
})

export const currentUserActions = currentUserSlice.actions

const currentUserReducer = currentUserSlice.reducer

export default currentUserReducer
