import { combineReducers } from "@reduxjs/toolkit"
import userReducer from "./users/slice"
import messageReducer from "./message/slice"

const rootReducer = combineReducers({
    users: userReducer,
    message: messageReducer,
})

export default rootReducer
