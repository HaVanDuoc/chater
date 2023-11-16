import { all, call, put, takeLatest } from "redux-saga/effects"
import Api from "./api"
import { actions } from "./slice"
import ActionTypes from "./actionTypes"
// import ActionTypeMessage from "../message/actionTypes"
// import { actionMessages } from "../message/slice"

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
        //     actionMessages[ActionTypeMessage.MESSAGE]({
        //         type: "success",
        //         content: loginResponse.message,
        //     }),
        // )
    } catch (error) {
        console.log("error", error)
        yield put(actions[ActionTypes.USER_LOGIN_FAILED](error))
    }
}

export default function* userSaga() {
    yield all([takeLatest(actions[ActionTypes.USER_LOGIN_REQUEST].type, loginSaga)])
}
