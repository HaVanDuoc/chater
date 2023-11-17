import { createSlice } from "@reduxjs/toolkit"
import { MessageArgsProps } from "antd"
import ActionTypes from "./actionTypes"

const initialState: MessageArgsProps & { show: boolean } = {
    type: undefined,
    content: null,
    show: false,
}

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        [ActionTypes.MESSAGE_OPEN]: (state, action) => {
            state.type = action.payload.type
            state.content = action.payload.content
            state.show = true
        },
        [ActionTypes.MESSAGE_CLOSE]: () => {
            return initialState
        },
    },
})

export const actionMessages = messageSlice.actions

const messageReducer = messageSlice.reducer

export default messageReducer
