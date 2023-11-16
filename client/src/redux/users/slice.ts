import ActionTypes from "./actionTypes"
import { createSlice } from "@reduxjs/toolkit"
import { IUser } from "./interfaces"
import { Status } from "../types"

interface UserState {
    status: Status
    error: any | null
    data: IUser[] | []
    message: string | null
    currentUser: IUser | null
}

const initialState: UserState = {
    status: "idle",
    message: null,
    error: null,
    data: [],
    currentUser: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        [ActionTypes.USER_LOGIN_REQUEST]: (state) => {
            state.status = "pending"
        },
        [ActionTypes.USER_LOGIN_SUCCEEDED]: (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
            state.currentUser = action.payload.data
        },
        [ActionTypes.USER_LOGIN_FAILED]: (state, action) => {
            state.status = "failed"
            state.error = action.payload
        },
    },
})

export const actions = userSlice.actions

const userReducer = userSlice.reducer

export default userReducer
