import { createSlice } from "@reduxjs/toolkit"
import { Status } from "../types"
import { userTypes } from "../type/user.type"
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
        [userTypes.GET_SUGGEST_FRIENDS]: (state) => {
            state.status = "pending"
        },
        [userTypes.GET_SUGGEST_FRIENDS_SUCCEEDED]: (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
            state.suggestFriends = action.payload.data
        },
        [userTypes.GET_SUGGEST_FRIENDS_FAILED]: (state, action) => {
            state.status = "failed"
            state.error = action.payload
        },

        // Get user
        [userTypes.GET_USER]: (state) => {
            state.status = "pending"
        },
        [userTypes.GET_USER_SUCCEEDED]: (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
            state.data = action.payload.user
        },
        [userTypes.GET_USER_FAILED]: (state, action) => {
            state.status = "failed"
            state.error = action.payload
        },

        // ADD FRIEND
        [userTypes.ADD_FRIEND]: (state) => {
            state.status = "pending"
        },
        [userTypes.ADD_FRIEND_SUCCEEDED]: (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
        },
        [userTypes.ADD_FRIEND_FAILED]: (state, action) => {
            state.status = "failed"
            state.error = action.payload.message
        },

        //
        [userTypes.LOGOUT]: (state) => {
            state.currentUser = null
        },

        //
        [userTypes.SEARCH_REQUEST]: (state) => {
            state.status = "pending"
        },
        [userTypes.SEARCH_SUCCESS]: (state, action) => {
            state.status = "succeeded"
            state.search = action.payload
        },
        [userTypes.SEARCH_FAILURE]: (state, action) => {
            state.status = "failed"
            state.error = action.payload
        },

        // Action accept request friend
        [userTypes.ACCEPT_FRIEND_REQUEST]: (state) => {
            state.status = "pending"
        },
        [userTypes.ACCEPT_FRIEND_SUCCESS]: (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
        },
        [userTypes.ACCEPT_FRIEND_FAILURE]: (state, action) => {
            state.status = "failed"
            state.error = action.payload
        },

        // Action reject request friend
        [userTypes.REJECT_FRIEND_REQUEST]: (state) => {
            state.status = "pending"
        },
        [userTypes.REJECT_FRIEND_SUCCESS]: (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
        },
        [userTypes.REJECT_FRIEND_FAILURE]: (state, action) => {
            state.status = "failed"
            state.error = action.payload
        },

        // Action DELETE friend
        [userTypes.DELETE_FRIEND_REQUEST]: (state) => {
            state.status = "pending"
        },
        [userTypes.DELETE_FRIEND_SUCCESS]: (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
        },
        [userTypes.ACCEPT_FRIEND_FAILURE]: (state, action) => {
            state.status = "failed"
            state.error = action.payload
        },
    },
})

export const actions = userSlice.actions

const userReducer = userSlice.reducer

export default userReducer
