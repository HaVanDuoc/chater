import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import userReducer from "../users/slice"

const userPersistConfig = {
    key: "user",
    storage,
    whitelist: ["currentUser"],
    blacklist: ["message", "data"],
}

export const persistedUserReducer = persistReducer(userPersistConfig, userReducer)
