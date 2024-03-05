import { createSlice } from "@reduxjs/toolkit"
import { Status } from "../types"
import { IChat } from "../interface/chat.interface"
import { chatTypes } from "../type/chat.type"

interface ChatState {
    getListChat: {
        status: Status
        message: string | null
        data: IChat[] | null
    }
}

const initialState: ChatState = {
    getListChat: {
        status: "idle",
        message: null,
        data: null,
    },
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        // GET LIST CHATS
        [chatTypes.GET_LIST_CHATS]: (state) => {
            state.getListChat.status = "pending"
        },
        [chatTypes.GET_LIST_CHATS_SUCCESS]: (state, action) => {
            state.getListChat.status = "succeeded"
            state.getListChat.message = action.payload.message
            state.getListChat.data = action.payload.chats
        },
        [chatTypes.GET_LIST_CHATS_FAILED]: (state, action) => {
            state.getListChat.status = "failed"
            state.getListChat.message = action.payload.message
        },

        // // GET CHAT
        // [chatTypes.GET_CHAT]: (state) => {
        //     state.status = "pending"
        // },
        // [chatTypes.GET_CHAT_SUCCESS]: (state, action) => {
        //     state.status = "succeeded"
        //     state.message = action.payload.message
        //     state.chat = action.payload.chat
        // },
        // [chatTypes.GET_CHAT_FAILED]: (state, action) => {
        //     state.status = "failed"
        //     state.message = action.payload.message
        // },

        // // Get messages
        // [chatTypes.GET_MESSAGES]: (state) => {
        //     state.status = "pending"
        // },
        // [chatTypes.GET_MESSAGES_SUCCESS]: (state, action) => {
        //     const chatId = action.payload.chatId
        //     const messages = action.payload.messages
        //     const chatIndex = state.listChats.findIndex((chat) => chat._id === chatId)

        //     state.status = "succeeded"
        //     state.message = action.payload.message
        //     state.listChats[chatIndex].messages = messages
        // },
        // [chatTypes.GET_MESSAGES_FAILED]: (state, action) => {
        //     state.status = "failed"
        //     state.message = action.payload.message
        // },

        // Send messages
        [chatTypes.ADD_MESSAGE]: (state, action) => {
            // state.listChats.push(action.payload.data)
        },
    },
})

export const chatActions = chatSlice.actions

const chatReducer = chatSlice.reducer

export default chatReducer
