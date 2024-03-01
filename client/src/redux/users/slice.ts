import ActionTypes from "./types"
import { createSlice } from "@reduxjs/toolkit"
import { IUser } from "./interfaces"
import { Status } from "../types"

interface UserState {
    status: Status
    message: string | null
    error: any | null
    data: any
    currentUser: IUser | null
    search: []
}

const initialState: UserState = {
    status: "idle",
    message: null,
    error: null,
    data: [],
    currentUser: null,
    search: [],
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
        [ActionTypes.LOGOUT]: (state) => {
            state.currentUser = null
        },
        [ActionTypes.SEARCH_REQUEST]: (state) => {
            state.status = "pending"
        },
        [ActionTypes.SEARCH_SUCCESS]: (state, action) => {
            state.status = "succeeded"
            state.search = action.payload
        },
        [ActionTypes.SEARCH_FAILURE]: (state, action) => {
            state.status = "failed"
            state.error = action.payload
        },

        [ActionTypes.GET_USER_REQUEST]: (state) => {
            state.status = "pending"
        },
        [ActionTypes.GET_USER_SUCCESS]: (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
            state.data = action.payload.data
        },
        [ActionTypes.SEARCH_FAILURE]: (state, action) => {
            state.status = "failed"
            state.error = action.payload
        },

        // // Action request friend
        // [ActionTypes.FRIEND_REQUEST]: (state) => {
        //     state.status = "pending"
        // },
        // [ActionTypes.FRIEND_REQUEST_SUCCESS]: (state, action) => {
        //     state.status = "succeeded"
        //     state.message = action.payload.message
        // },
        // [ActionTypes.FRIEND_REQUEST_FAILURE]: (state, action) => {
        //     state.status = "failed"
        //     state.error = action.payload.message
        // },

        // Action accept request friend
        [ActionTypes.ACCEPT_FRIEND_REQUEST]: (state) => {
            state.status = "pending"
        },
        [ActionTypes.ACCEPT_FRIEND_SUCCESS]: (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
        },
        [ActionTypes.ACCEPT_FRIEND_FAILURE]: (state, action) => {
            state.status = "failed"
            state.error = action.payload
        },

        // Action reject request friend
        [ActionTypes.REJECT_FRIEND_REQUEST]: (state) => {
            state.status = "pending"
        },
        [ActionTypes.REJECT_FRIEND_SUCCESS]: (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
        },
        [ActionTypes.REJECT_FRIEND_FAILURE]: (state, action) => {
            state.status = "failed"
            state.error = action.payload
        },

        // Action DELETE friend
        [ActionTypes.DELETE_FRIEND_REQUEST]: (state) => {
            state.status = "pending"
        },
        [ActionTypes.DELETE_FRIEND_SUCCESS]: (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
        },
        [ActionTypes.ACCEPT_FRIEND_FAILURE]: (state, action) => {
            state.status = "failed"
            state.error = action.payload
        },
    },
})

export const actions = userSlice.actions

const userReducer = userSlice.reducer

export default userReducer
