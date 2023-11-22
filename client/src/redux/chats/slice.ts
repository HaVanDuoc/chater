import { createSlice } from "@reduxjs/toolkit"
import { Status } from "../types"
import typesChat from "./types"

interface ChatState {
    status: Status
    message: string | null
    error: any | null
    data: any
}

const initialState: ChatState = {
    status: "idle",
    message: null,
    error: null,
    data: {},
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        [typesChat.FETCH_CHAT_REQUEST]: (state, action) => {
            state.status = "pending"
        },
        [typesChat.FETCH_CHAT_SUCCESS]: (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
            state.data = action.payload.data
        },
        [typesChat.FETCH_CHAT_REQUEST]: (state, action) => {
            state.status = "failed"
            state.error = action.payload
        },
    },
})

export const actionsChat = chatSlice.actions

const chatReducer = chatSlice.reducer

export default chatReducer
