import { delay, put, takeLatest } from "redux-saga/effects"
import ActionTypeMessage from "./actionTypes"
import { actionMessages } from "./slice"
import { actions } from "../users/slice"

export function* messageSaga() {
    try {
        yield delay(2500)
        yield put(actionMessages[ActionTypeMessage.MESSAGE_CLOSE])
    } catch (error) {
        yield put(actionMessages[ActionTypeMessage.MESSAGE_CLOSE])
    }
}

export function* watchMessageSaga() {
    yield takeLatest(actions[ActionTypeMessage.MESSAGE_OPEN], messageSaga)
}
