import { createSlice } from "@reduxjs/toolkit"
import { Status } from "../types"
import messageTypes from "./types"
import { IMessage } from "./interfaces"

const initialState: { status: Status; message: string; error?: string; data: IMessage[] } = {
    status: "idle",
    message: "",
    error: undefined,
    data: [],
}

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        // Fetch message
        [messageTypes.FETCH_MESSAGE_REQUEST]: (state) => {
            state.status = "pending"
        },
        [messageTypes.FETCH_MESSAGE_SUCCESS]: (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
            state.data = action.payload.data
        },
        [messageTypes.FETCH_MESSAGE_FAILURE]: (state, action) => {
            state.status = "failed"
            state.message = action.payload.message
            state.error = action.payload.error
        },

        // Send message
        [messageTypes.SEND_MESSAGE_REQUEST]: (state) => {
            state.status = "pending"
        },
        [messageTypes.SEND_MESSAGE_SUCCESS]: (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
            state.data = action.payload.data
        },
        [messageTypes.SEND_MESSAGE_FAILURE]: (state, action) => {
            state.status = "failed"
            state.message = action.payload.message
            state.error = action.payload.error
        },
    },
})

export const messageActions = messageSlice.actions

const messageReducer = messageSlice.reducer

export default messageReducer
