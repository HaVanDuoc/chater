import { createAction } from "@reduxjs/toolkit"
import { chatTypes } from "../type/chat.type"

export const getListChats = () => {
    return createAction(chatTypes.GET_LIST_CHATS)()
}
