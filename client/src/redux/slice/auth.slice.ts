import { createSlice } from "@reduxjs/toolkit"
import { IUser } from "../interface/user.interface"
import { authTypes } from "../type/auth.type"

interface AuthState {
    user?: IUser | null
    login: {
        error: Boolean
        message?: String | null
    }
}

const initialState: AuthState = {
    user: null,
    login: {
        error: false,
        message: null,
    },
}

const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        [authTypes.CHECK_SESSION]: (state, action) => {
            state.user = action.payload?.user
            state.login.message = action.payload?.message
            state.login.error = action.payload?.error
        },

        [authTypes.LOGOUT]: (state) => {
            state = initialState
        },
    },
})

export const authActions = authSlice.actions

const authReducer = authSlice.reducer

export default authReducer
