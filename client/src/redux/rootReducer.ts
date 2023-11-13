import { combineReducers } from "@reduxjs/toolkit"
import userReducer from "./users/slice"

const rootReducer = combineReducers({
    users: userReducer,
})

export default rootReducer
