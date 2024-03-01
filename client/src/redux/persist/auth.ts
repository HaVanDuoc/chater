import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import authReducer from "../slice/auth.slice"

const authPersistConfig = {
    key: "auth",
    storage,
}

export const persistedAuthReducer = persistReducer(authPersistConfig, authReducer)
