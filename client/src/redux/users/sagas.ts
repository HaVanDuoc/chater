import { all, call, put, takeLatest } from "redux-saga/effects"
import Api from "./api"
import { actions } from "./slice"
import ActionTypes from "./actionTypes"

export function* loginSaga(action: any): Generator<any, any, any> {
    try {
        const loginResponse = yield call(Api.login, action.payload)

        // Check error of API no response
        if (loginResponse?.code === "ERR_BAD_REQUEST")
            return yield put(actions[ActionTypes.USER_LOGIN_FAILED](loginResponse))

        // dispatch succeeded
        yield put(actions[ActionTypes.USER_LOGIN_SUCCEEDED](loginResponse))
        window.location.href = "/chat"

        // Alert
        // yield put(
        //     actionMessages[ActionTypeMessage.MESSAGE_OPEN]({
        //         type: "success",
        //         content: loginResponse.message,
        //     }),
        // )
    } catch (error) {
        yield put(actions[ActionTypes.USER_LOGIN_FAILED](error))
    }
}

export function* logoutSaga(action: any): Generator<any, any, any> {
    try {
        window.location.href = "/"
    } catch (error) {
        console.log("error", error)
        yield put(actions[ActionTypes.USER_LOGIN_FAILED](error))
    }
}

export function* searchSaga(action: any): Generator<any, any, any> {
    try {
        const searchData = yield call(Api.search, action.payload)
        yield put(actions[ActionTypes.SEARCH_SUCCESS](searchData.data))
    } catch (error) {
        yield put(actions[ActionTypes.SEARCH_FAILURE](error))
    }
}

export default function* userSaga() {
    yield all([
        takeLatest(actions[ActionTypes.USER_LOGIN_REQUEST].type, loginSaga),
        takeLatest(actions[ActionTypes.LOGOUT].type, logoutSaga),
        takeLatest(actions[ActionTypes.SEARCH_REQUEST].type, searchSaga),
    ])
}
