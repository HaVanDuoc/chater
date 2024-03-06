import { combineReducers } from "@reduxjs/toolkit"
import messageReducer from "./slice/message.slice"
import searchReducer from "./slice/search.slice"
import inviteReducer from "./slice/invite.slice"
import chatReducer from "./slice/chat.slice"
import alertReducer from "./slice/alert.slice"
import suggestFriendReducer from "./slice/suggestFriends.slice"
import currentUserReducer from "./slice/currentUser.slice"
import userReducer from "./slice/user.slice"
import friendReducer from "./slice/friend.slice"
import socketReducer from "./slice/socket.slice"

const rootReducer = combineReducers({
    currentUser: currentUserReducer,
    user: userReducer,
    friend: friendReducer,
    suggestFriend: suggestFriendReducer,
    invites: inviteReducer,
    chats: chatReducer,
    messages: messageReducer,
    socket: socketReducer,
    searches: searchReducer,
    alert: alertReducer,
})

export default rootReducer
