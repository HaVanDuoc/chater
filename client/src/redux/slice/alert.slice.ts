import { createSlice } from "@reduxjs/toolkit"
import { Status } from "../types"
import { alertTypes } from "../type/alert.type"

export type TYPE_ALERT = "success" | "info" | "warning" | "error"

interface AlertState {
    status: Status
    message: string
    type?: TYPE_ALERT
}

const initialState: AlertState = {
    status: "idle",
    message: "",
}

const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        [alertTypes.ALERT]: (state) => {
            state.status = "pending"
        },
        [alertTypes.ALERT_SUCCESS]: (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
            state.type = "success"
        },
        [alertTypes.ALERT_FAILED]: (state, action) => {
            state.status = "failed"
            state.message = action.payload.message
            state.type = "error"
        },
        [alertTypes.ALERT_RESET]: (state) => {
            state = initialState
        },
    },
})

export const alertActions = alertSlice.actions

const alertReducer = alertSlice.reducer

export default alertReducer
