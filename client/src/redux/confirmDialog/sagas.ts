import { all, put, takeLatest } from "redux-saga/effects"
import { confirmDialogActions } from "./slice"
import { toast } from "react-toastify"
import confirmDialogTypes from "./types"

export function* okSaga(action: any) {
    try {
        const oke = action.payload.onOk
        yield put(confirmDialogActions[confirmDialogTypes.OK_CONFIRM_DIALOG_SUCCESS](oke))
        toast.success(oke.message)
        yield put(confirmDialogActions[confirmDialogTypes.CANCEL_CONFIRM_DIALOG])
    } catch (error) {
        yield put(confirmDialogActions[confirmDialogTypes.OK_CONFIRM_DIALOG_FAILURE])
    }
}

export default function* watchConfirmDialog() {
    yield all([
        takeLatest(confirmDialogActions[confirmDialogTypes.OK_CONFIRM_DIALOG_REQUEST].type, okSaga),
    ])
}
