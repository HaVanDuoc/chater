import { createSlice } from "@reduxjs/toolkit"
import { Status } from "../types"
import { IChat } from "../interface/chat.interface"
import { chatTypes } from "../type/chat.type"

interface ChatState {
    getListChat: {
        status: Status
        message: string | null
        data: IChat[]
    }
    deleteChat: {
        status: Status
        message: string | null
        data: IChat[]
    }
    refetch: boolean
}

const initialState: ChatState = {
    getListChat: {
        status: "idle",
        message: null,
        data: [],
    },
    deleteChat: {
        status: "idle",
        message: null,
        data: [],
    },
    refetch: false,
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        // Get list chats
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

        // Add message to store
        [chatTypes.ADD_NEW_MESSAGE]: (state, action) => {
            const index = state.getListChat.data.findIndex(
                (chat) => chat._id === action.payload.chatId,
            )
            state.getListChat.data[index].messages?.unshift(action.payload.message)
        },

        // Delete chat in store
        [chatTypes.DELETE_CHAT_STORE]: (state, action) => {
            const indexDelete = state.getListChat.data.findIndex(
                (chat) => chat._id === action.payload.chatId,
            )
            state.getListChat.data = state.getListChat.data.filter(
                (_, index) => index !== indexDelete,
            )
        },

        // Delete chat
        [chatTypes.DELETE_CHAT]: (state) => {
            state.deleteChat.status = "pending"
        },
        [chatTypes.DELETE_CHAT_SUCCESS]: (state, action) => {
            state.deleteChat.status = "succeeded"
            state.deleteChat.message = action.payload.message
            state.deleteChat.data = action.payload.data
            state.getListChat.data = state.getListChat.data.filter(
                (chat) => chat._id !== action.payload.data._id,
            )
        },
        [chatTypes.DELETE_CHAT_FAILED]: (state, action) => {
            state.deleteChat.status = "failed"
            state.deleteChat.message = action.payload.message
        },
    },
})

export const chatActions = chatSlice.actions

const chatReducer = chatSlice.reducer

export default chatReducer
