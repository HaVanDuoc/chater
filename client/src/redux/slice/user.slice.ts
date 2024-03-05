import { userTypes } from "~/redux/type/user.type"
import { createSlice } from "@reduxjs/toolkit"
import { Status } from "../types"
import { IUser } from "../interface/user.interface"

interface UserState {
    getUser: {
        status: Status
        message: string | null
        data: IUser | null
    }
    logout: {
        status: Status
        message: string | null
    }
}

const initialState: UserState = {
    getUser: {
        status: "idle",
        message: null,
        data: null,
    },
    logout: {
        status: "idle",
        message: null,
    },
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // Get user
        [userTypes.GET_USER]: (state) => {
            state.getUser.status = "pending"
        },
        [userTypes.GET_USER_SUCCEEDED]: (state, action) => {
            state.getUser.status = "succeeded"
            state.getUser.message = action.payload.message
            state.getUser.data = action.payload.user
        },
        [userTypes.GET_USER_FAILED]: (state, action) => {
            state.getUser.status = "failed"
            state.getUser.message = action.payload.message
        },

        // Logout
        [userTypes.LOGOUT]: (state) => {
            state.logout.status = "pending"
        },
        [userTypes.LOGOUT_SUCCESS]: (state, action) => {
            state.logout.status = "succeeded"
            state.logout.message = action.payload.message
        },
        [userTypes.LOGOUT_FAILED]: (state, action) => {
            state.logout.status = "failed"
            state.logout.message = action.payload.message
        },

        //
        // [userTypes.SEARCH_REQUEST]: (state) => {
        //     state.status = "pending"
        // },
        // [userTypes.SEARCH_SUCCESS]: (state, action) => {
        //     state.status = "succeeded"
        //     state.search = action.payload
        // },
        // [userTypes.SEARCH_FAILURE]: (state, action) => {
        //     state.status = "failed"
        //     state.error = action.payload
        // },
        // // Action accept request friend
        // [userTypes.ACCEPT_FRIEND_REQUEST]: (state) => {
        //     state.status = "pending"
        // },
        // [userTypes.ACCEPT_FRIEND_SUCCESS]: (state, action) => {
        //     state.status = "succeeded"
        //     state.message = action.payload.message
        // },
        // [userTypes.ACCEPT_FRIEND_FAILURE]: (state, action) => {
        //     state.status = "failed"
        //     state.error = action.payload
        // },
        // // Action reject request friend
        // [userTypes.REJECT_FRIEND_REQUEST]: (state) => {
        //     state.status = "pending"
        // },
        // [userTypes.REJECT_FRIEND_SUCCESS]: (state, action) => {
        //     state.status = "succeeded"
        //     state.message = action.payload.message
        // },
        // [userTypes.REJECT_FRIEND_FAILURE]: (state, action) => {
        //     state.status = "failed"
        //     state.error = action.payload
        // },
        // // Action DELETE friend
        // [userTypes.DELETE_FRIEND_REQUEST]: (state) => {
        //     state.status = "pending"
        // },
        // [userTypes.DELETE_FRIEND_SUCCESS]: (state, action) => {
        //     state.status = "succeeded"
        //     state.message = action.payload.message
        // },
        // [userTypes.ACCEPT_FRIEND_FAILURE]: (state, action) => {
        //     state.status = "failed"
        //     state.error = action.payload
        // },
    },
})

export const userActions = userSlice.actions

const userReducer = userSlice.reducer

export default userReducer
