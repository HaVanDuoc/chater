import { createSlice } from "@reduxjs/toolkit"
import { MessageArgsProps } from "antd"
import ActionTypes from "./actionTypes"

const initialState: MessageArgsProps & { show: boolean } = {
    type: "loading",
    content: "undefined",
    show: false,
}

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        [ActionTypes.MESSAGE]: (state, action) => {
            state.type = action.payload.type
            state.content = action.payload.content
            state.show = !state.show
        },
    },
})

export const actionMessages = messageSlice.actions

const messageReducer = messageSlice.reducer

export default messageReducer
