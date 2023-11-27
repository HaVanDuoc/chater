import { combineReducers } from "@reduxjs/toolkit"
import { persistedUserReducer } from "./persist/user"
import chatReducer from "./chats/slice"
import confirmDialogReducer from "./confirmDialog/slice"
import messageReducer from "./messages/slice"
import searchReducer from "./searches/slice"

const rootReducer = combineReducers({
    users: persistedUserReducer,
    chats: chatReducer,
    confirmDialog: confirmDialogReducer,
    messages: messageReducer,
    searches: searchReducer,
})

export default rootReducer
