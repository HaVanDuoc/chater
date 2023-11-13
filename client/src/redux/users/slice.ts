import ActionTypes from "./actionTypes"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Status } from "../rootInterfaces"
import { IUser } from "./interfaces"

interface UserState {
    status: Status
    error: any | null
    data: IUser[] | []
}

const initialState: UserState = {
    status: "idle",
    error: null,
    data: [],
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        [ActionTypes.FETCH_USER]: (state) => {
            state.status = "pending"
        },
        [ActionTypes.FETCH_USER_SUCCEEDED]: (state, action) => {
            state.status = "succeeded"
            state.data = action.payload
        },
        [ActionTypes.FETCH_USER_FAILED]: (state, action: PayloadAction<any>) => {
            state.status = "failed"
            state.error = action.payload.message
        },
    },
})

export const actions = userSlice.actions

const userReducer = userSlice.reducer

export default userReducer
