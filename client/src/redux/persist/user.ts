import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import userReducer from "../slice/user.slice"

const userPersistConfig = {
    key: "user",
    storage,
    whitelist: ["currentUser"],
}

export const persistedUserReducer = persistReducer(userPersistConfig, userReducer)
