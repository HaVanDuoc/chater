import { delay, put, takeLatest } from "redux-saga/effects"
import { alertActions } from "../slice/alert.slice"
import { alertTypes } from "../type/alert.type"

export function* alert(action: any): Generator<any, any, any> {
    try {
        console.log("action", action.payload)
        yield put(alertActions[alertTypes.ALERT_SUCCESS](action.payload))
        yield delay(3000)
        yield put(alertActions[alertTypes.ALERT_RESET])
    } catch (error) {
        yield put(alertActions[alertTypes.ALERT_FAILED](error))
    }
}

export default function* alertSaga() {
    yield takeLatest(alertActions[alertTypes.ALERT].type, alert)
}
