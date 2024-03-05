import messageTypes from "../type/message.type"
import { createSlice } from "@reduxjs/toolkit"
import { Status } from "../types"
import { IMessage } from "../interface/message.interface"

interface MessageState {
    sendMessage: {
        status: Status
        message: string | null
        data: IMessage | null
    }
}

const initialState: MessageState = {
    sendMessage: {
        status: "idle",
        message: null,
        data: null,
    },
}

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        // Send message
        [messageTypes.SEND_MESSAGE]: (state) => {
            state.sendMessage.status = "pending"
        },
        [messageTypes.SEND_MESSAGE_SUCCESS]: (state, action) => {
            state.sendMessage.status = "succeeded"
            state.sendMessage.message = action.payload.message
            state.sendMessage.data = action.payload.data
        },
        [messageTypes.SEND_MESSAGE_FAILED]: (state, action) => {
            state.sendMessage.status = "failed"
            state.sendMessage.message = action.payload.message
        },
    },
})

export const messageActions = messageSlice.actions

const messageReducer = messageSlice.reducer

export default messageReducer
