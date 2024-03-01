import { createSlice } from "@reduxjs/toolkit"
import { Status } from "../types"
import { IChat } from "../interface/chat.interface"
import { chatTypes } from "../type/chat.type"

interface ChatState {
    status: Status
    message: string | null
    listChats: IChat[]
    chat: {
        members: []
    }
}

const initialState: ChatState = {
    status: "idle",
    message: null,
    listChats: [],
    chat: {
        members: [],
    },
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        // GET LIST CHATS
        [chatTypes.GET_LIST_CHATS]: (state) => {
            state.status = "pending"
        },
        [chatTypes.GET_LIST_CHATS_SUCCESS]: (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
            state.listChats = action.payload.chats
        },
        [chatTypes.GET_LIST_CHATS_FAILED]: (state, action) => {
            state.status = "failed"
            state.message = action.payload.message
        },

        // GET CHAT
        [chatTypes.GET_CHAT]: (state) => {
            state.status = "pending"
        },
        [chatTypes.GET_CHAT_SUCCESS]: (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
            state.chat = action.payload.chat
        },
        [chatTypes.GET_CHAT_FAILED]: (state, action) => {
            state.status = "failed"
            state.message = action.payload.message
        },
    },
})

export const chatActions = chatSlice.actions

const chatReducer = chatSlice.reducer

export default chatReducer
