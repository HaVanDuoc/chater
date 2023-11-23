import { combineReducers } from "@reduxjs/toolkit"
import { persistedUserReducer } from "./persist/user"
import chatReducer from "./chats/slice"

const rootReducer = combineReducers({
    users: persistedUserReducer,
    chats: chatReducer,
})

export default rootReducer
