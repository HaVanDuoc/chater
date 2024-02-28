import { createSlice } from "@reduxjs/toolkit"
import { Status } from "../types"
import { types } from "../type/user.type"
import { IUser } from "../interface/user.interface"

interface UserState {
    status: Status
    message: string | null
    error: any | null
    data: any
    currentUser: IUser | null
    search: []
    suggestFriends: []
}

const initialState: UserState = {
    status: "idle",
    message: null,
    error: null,
    data: [],
    currentUser: null,
    search: [],
    suggestFriends: [],
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        //
        [types.GET_CURRENT_USER]: (state) => {
            state.status = "pending"
        },
        [types.GET_CURRENT_USER_SUCCEEDED]: (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
            state.currentUser = action.payload.user
        },
        [types.GET_CURRENT_USER_FAILED]: (state, action) => {
            state.status = "failed"
            state.error = action.payload
        },

        //
        [types.GET_SUGGEST_FRIENDS]: (state) => {
            state.status = "pending"
        },
        [types.GET_SUGGEST_FRIENDS_SUCCEEDED]: (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
            state.suggestFriends = action.payload.data
        },
        [types.GET_SUGGEST_FRIENDS_FAILED]: (state, action) => {
            state.status = "failed"
            state.error = action.payload
        },

        // Get user
        [types.GET_USER]: (state) => {
            state.status = "pending"
        },
        [types.GET_USER_SUCCEEDED]: (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
            state.data = action.payload.user
        },
        [types.GET_USER_FAILED]: (state, action) => {
            state.status = "failed"
            state.error = action.payload
        },

        // ADD FRIEND
        [types.ADD_FRIEND]: (state) => {
            state.status = "pending"
        },
        [types.ADD_FRIEND_SUCCEEDED]: (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
        },
        [types.ADD_FRIEND_FAILED]: (state, action) => {
            state.status = "failed"
            state.error = action.payload.message
        },

        //
        [types.LOGOUT]: (state) => {
            state.currentUser = null
        },

        //
        [types.SEARCH_REQUEST]: (state) => {
            state.status = "pending"
        },
        [types.SEARCH_SUCCESS]: (state, action) => {
            state.status = "succeeded"
            state.search = action.payload
        },
        [types.SEARCH_FAILURE]: (state, action) => {
            state.status = "failed"
            state.error = action.payload
        },

        // Action accept request friend
        [types.ACCEPT_FRIEND_REQUEST]: (state) => {
            state.status = "pending"
        },
        [types.ACCEPT_FRIEND_SUCCESS]: (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
        },
        [types.ACCEPT_FRIEND_FAILURE]: (state, action) => {
            state.status = "failed"
            state.error = action.payload
        },

        // Action reject request friend
        [types.REJECT_FRIEND_REQUEST]: (state) => {
            state.status = "pending"
        },
        [types.REJECT_FRIEND_SUCCESS]: (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
        },
        [types.REJECT_FRIEND_FAILURE]: (state, action) => {
            state.status = "failed"
            state.error = action.payload
        },

        // Action DELETE friend
        [types.DELETE_FRIEND_REQUEST]: (state) => {
            state.status = "pending"
        },
        [types.DELETE_FRIEND_SUCCESS]: (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
        },
        [types.ACCEPT_FRIEND_FAILURE]: (state, action) => {
            state.status = "failed"
            state.error = action.payload
        },
    },
})

export const actions = userSlice.actions

const userReducer = userSlice.reducer

export default userReducer
