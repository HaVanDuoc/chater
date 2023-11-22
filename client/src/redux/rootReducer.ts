import { combineReducers } from "@reduxjs/toolkit"
import { persistedUserReducer } from "./persist/user"
import messageReducer from "./message/slice"
import chatReducer from "./chats/slice"

const rootReducer = combineReducers({
    users: persistedUserReducer,
    message: messageReducer,
    chats: chatReducer,
})

export default rootReducer
