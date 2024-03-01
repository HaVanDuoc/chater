import { combineReducers } from "@reduxjs/toolkit"
import confirmDialogReducer from "./confirmDialog/slice"
import messageReducer from "./messages/slice"
import searchReducer from "./searches/slice"
import inviteReducer from "./slice/invite.slice"
import userReducer from "./slice/user.slice"
import authReducer from "./slice/auth.slice"
import chatReducer from "./slice/chat.slice"

const rootReducer = combineReducers({
    auth: authReducer,
    users: userReducer,
    invites: inviteReducer,
    chats: chatReducer,
    confirmDialog: confirmDialogReducer,
    messages: messageReducer,
    searches: searchReducer,
})

export default rootReducer
