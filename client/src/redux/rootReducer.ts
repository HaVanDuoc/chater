import { combineReducers } from "@reduxjs/toolkit"
import { persistedUserReducer } from "./persist/user"
import chatReducer from "./chats/slice"
import confirmDialogReducer from "./confirmDialog/slice"
import messageReducer from "./messages/slice"
import searchReducer from "./searches/slice"
import inviteReducer from "./slice/invite.slice"
import userReducer from "./slice/user.slice"

const rootReducer = combineReducers({
    users: userReducer,
    invites: inviteReducer,
    chats: chatReducer,
    confirmDialog: confirmDialogReducer,
    messages: messageReducer,
    searches: searchReducer,
})

export default rootReducer
