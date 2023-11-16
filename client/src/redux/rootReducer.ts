import { combineReducers } from "@reduxjs/toolkit"
import { persistedUserReducer } from "./persist/user"
import messageReducer from "./message/slice"

const rootReducer = combineReducers({
    users: persistedUserReducer,
    message: messageReducer,
})

export default rootReducer
