import { combineReducers } from "@reduxjs/toolkit"
import { persistedUserReducer } from "./persist/user"
import chatReducer from "./chats/slice"
import confirmDialogReducer from "./confirmDialog/slice"

const rootReducer = combineReducers({
    users: persistedUserReducer,
    chats: chatReducer,
    confirmDialog: confirmDialogReducer,
})

export default rootReducer
