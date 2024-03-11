import { createAction } from "@reduxjs/toolkit"
import { socketTypes } from "../type/socket.type"
import { Socket } from "socket.io-client"

export const setSocket = (socket: Socket) => {
    return createAction<Socket>(socketTypes.SET_SOCKET)(socket)
}

// export const purgeSocket = () => {
//     return createAction(socketTypes.PURGE_SOCKET)()
// }
