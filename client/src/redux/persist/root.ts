import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import rootReducer from "../rootReducer"

const persistConfig = {
    key: "root",
    storage,
    blacklist: ["user"],
}

export const persistedReducer = persistReducer(persistConfig, rootReducer)
