import ActionTypes from "./actionTypes"
import { createSlice } from "@reduxjs/toolkit"
import { Status } from "../rootInterfaces"
import { IUser } from "./interfaces"

interface UserState {
    status: Status
    error: any | null
    data: IUser[] | []
    message: string | null
}

const initialState: UserState = {
    status: "idle",
    message: null,
    error: null,
    data: [],
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
            state.data = action.payload.data
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
