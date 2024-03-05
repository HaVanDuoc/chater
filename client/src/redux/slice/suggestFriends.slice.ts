import { createSlice } from "@reduxjs/toolkit"
import { IUser } from "../interface/user.interface"
import { Status } from "../types"
import { suggestFriendTypes } from "../type/suggestFriends.type"

interface SuggestFriendState {
    status: Status
    message?: string
    data?: IUser[]
}

const initialState: SuggestFriendState = {
    status: "idle",
}

const suggestFriendSlice = createSlice({
    name: "suggestFriends",
    initialState,
    reducers: {
        [suggestFriendTypes.GET_SUGGEST_FRIENDS]: (state) => {
            state.status = "pending"
        },
        [suggestFriendTypes.GET_SUGGEST_FRIENDS_SUCCESS]: (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
            state.data = action.payload.data
        },
        [suggestFriendTypes.GET_SUGGEST_FRIENDS_FAILED]: (state, action) => {
            state.status = "failed"
            state.message = action.payload.message
        },
    },
})

export const suggestFriendActions = suggestFriendSlice.actions

const suggestFriendReducer = suggestFriendSlice.reducer

export default suggestFriendReducer