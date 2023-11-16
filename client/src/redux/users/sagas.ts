import { all, call, put, takeLatest } from "redux-saga/effects"
import { actions } from "./slice"
import ActionTypes from "./actionTypes"
import Api from "./api"

export function* loginSaga(action: any): Generator<any, any, any> {
    try {
        const loginResponse = yield call(Api.login, action.payload)

        // Check error of API no response
        if (loginResponse?.code === "ERR_BAD_REQUEST")
            return yield put(actions[ActionTypes.USER_LOGIN_FAILED](loginResponse))

        // dispatch succeeded
        yield put(actions[ActionTypes.USER_LOGIN_SUCCEEDED](loginResponse))

        return (window.location.href = "/chat")
    } catch (error) {
        console.log("error", error)
        yield put(actions[ActionTypes.USER_LOGIN_FAILED](error))
    }
}

export default function* userSaga() {
    yield all([takeLatest(ActionTypes.USER_LOGIN_REQUEST, loginSaga)])
}
