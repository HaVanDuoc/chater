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
        localStorage.setItem("token", loginResponse?.data?.token)
        const newestChatId = loginResponse?.data?.chats[0]?._id
        window.location.href = `/chat${newestChatId ? "/" + newestChatId : ""}`

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

export function* getUserSaga(action: any): Generator<any, any, any> {
    try {
        const user = yield call(Api.getUser, action.payload)
        yield put(actions[ActionTypes.GET_USER_SUCCESS](user))
    } catch (error) {
        yield put(actions[ActionTypes.GET_USER_FAILURE](error))
    }
}

export function* requestFriend(action: any): Generator<any, any, any> {
    try {
        const request = yield call(Api.requestFriend, action.payload)
        console.log("request", request)
        yield put(actions[ActionTypes.FRIEND_REQUEST_SUCCESS](request))
    } catch (error) {
        yield put(actions[ActionTypes.FRIEND_REQUEST_FAILURE](error))
    }
}

export function* acceptFriend(action: any): Generator<any, any, any> {
    try {
        console.log("action", action)
        const accept = yield call(Api.acceptFriend, action.payload)
        console.log("accept", accept)
        yield put(actions[ActionTypes.ACCEPT_FRIEND_SUCCESS](accept))
    } catch (error) {
        yield put(actions[ActionTypes.ACCEPT_FRIEND_FAILURE](error))
    }
}

export function* rejectFriend(action: any): Generator<any, any, any> {
    try {
        const reject = yield call(Api.rejectFriend, action.payload)
        console.log("reject", reject)
        yield put(actions[ActionTypes.REJECT_FRIEND_SUCCESS](reject))
    } catch (error) {
        yield put(actions[ActionTypes.REJECT_FRIEND_FAILURE](error))
    }
}

export default function* userSaga() {
    yield all([
        takeLatest(actions[ActionTypes.USER_LOGIN_REQUEST].type, loginSaga),
        takeLatest(actions[ActionTypes.LOGOUT].type, logoutSaga),
        takeLatest(actions[ActionTypes.SEARCH_REQUEST].type, searchSaga),
        takeLatest(actions[ActionTypes.GET_USER_REQUEST].type, getUserSaga),
        takeLatest(actions[ActionTypes.FRIEND_REQUEST].type, requestFriend),
        takeLatest(actions[ActionTypes.ACCEPT_FRIEND_REQUEST].type, acceptFriend),
        takeLatest(actions[ActionTypes.REJECT_FRIEND_REQUEST].type, rejectFriend),
    ])
}
