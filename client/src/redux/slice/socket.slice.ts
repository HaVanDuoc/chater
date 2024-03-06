import { createSlice } from "@reduxjs/toolkit"
import { socketTypes } from "../type/socket.type"
import { Socket } from "socket.io-client"

interface SocketState {
    socket: Socket | null
    getOnlineUsers: any | null
}

const initialState: SocketState = {
    socket: null,
    getOnlineUsers: null,
}

const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
        [socketTypes.SET_SOCKET]: (state, action) => {
            state.socket = action.payload
        },
        [socketTypes.GET_ONLINE_USERS]: (state, action) => {
            state.getOnlineUsers = action.payload
        },
    },
})

export const socketActions = socketSlice.actions

const socketReducer = socketSlice.reducer

export default socketReducer
