import { all, call, put, takeLatest } from "redux-saga/effects"
import { actions } from "./slice"
import ActionTypes from "./actionTypes"
import Api from "./api"

export function* loginSaga(action: any): Generator<any, any, any> {
    try {
        const loginResponse = yield call(Api.login, action.payload)
        yield put(actions[ActionTypes.USER_LOGIN_SUCCEEDED](loginResponse))
    } catch (error) {
        yield put({ type: ActionTypes.USER_LOGIN_FAILED, error: error })
    }
}

export default function* userSaga() {
    yield all([takeLatest(ActionTypes.USER_LOGIN_REQUEST, loginSaga)])
}
