import { createSlice } from "@reduxjs/toolkit"
import { IUser } from "../interface/user.interface"
import { Status } from "../types"
import { suggestFriendTypes } from "../type/suggestFriends.type"
import { friendTypes } from "../type/friend.type"

interface FriendState {
    getListFriend: {
        status: Status
        message: string | null
        data: IUser[] | null
    }
}

const initialState: FriendState = {
    getListFriend: {
        status: "idle",
        message: null,
        data: null,
    },
}

const friendSlice = createSlice({
    name: "suggestFriends",
    initialState,
    reducers: {
        [friendTypes.GET_LIST_FRIEND]: (state) => {
            state.getListFriend.status = "pending"
        },
        [friendTypes.GET_LIST_FRIEND_SUCCESS]: (state, action) => {
            state.getListFriend.status = "succeeded"
            state.getListFriend.message = action.payload.message
            state.getListFriend.data = action.payload.data
        },
        [friendTypes.GET_LIST_FRIEND_FAILED]: (state, action) => {
            state.getListFriend.status = "failed"
            state.getListFriend.message = action.payload.message
        },
    },
})

export const friendActions = friendSlice.actions

const friendReducer = friendSlice.reducer

export default friendReducer
