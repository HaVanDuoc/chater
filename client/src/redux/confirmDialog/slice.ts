import { createSlice } from "@reduxjs/toolkit"
import { IConfirmDialog } from "./interfaces"
import confirmDialogTypes from "./types"
import { Status } from "../types"

const initialState: { status: Status; message: string; error: string } & IConfirmDialog = {
    status: "idle",
    message: "",
    error: "",
    open: false,
    title: "",
    content: "",
    onOk() {},
    onCancel() {},
    okText: "Đồng ý",
    cancelText: "Hủy",
}

const confirmDialogSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        [confirmDialogTypes.OPEN_CONFIRM_DIALOG]: (state, action: { payload: IConfirmDialog }) => {
            state.open = true
            state.title = action.payload.title
            state.content = action.payload.content
            state.onOk = action.payload.onOk
            state.onCancel = action.payload.onCancel
            state.okText = action.payload.okText || state.okText
            state.cancelText = action.payload.cancelText || state.cancelText
        },
        [confirmDialogTypes.CANCEL_CONFIRM_DIALOG]: () => {
            return initialState
        },

        // Actions OK
        [confirmDialogTypes.OK_CONFIRM_DIALOG_REQUEST]: (state) => {
            state.status = "pending"
        },
        [confirmDialogTypes.OK_CONFIRM_DIALOG_SUCCESS]: (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
        },
        [confirmDialogTypes.OK_CONFIRM_DIALOG_FAILURE]: (state, action) => {
            state.status = "failed"
            state.message = action.payload
        },
    },
})

export const confirmDialogActions = confirmDialogSlice.actions

const confirmDialogReducer = confirmDialogSlice.reducer

export default confirmDialogReducer
