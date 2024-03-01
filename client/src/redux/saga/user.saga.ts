import API from "../api/user.api"
import { userTypes } from "../type/user.type"
import { actions } from "../slice/user.slice"
import { all, call, put, takeLatest } from "redux-saga/effects"
import { toast } from "react-toastify"

export function* getSuggestFriends(): Generator<any, any, any> {
    try {
        const result = yield call(API.getSuggestFriends)
        if (result.error) return yield put(actions[userTypes.GET_SUGGEST_FRIENDS_FAILED](result))
        yield put(actions[userTypes.GET_SUGGEST_FRIENDS_SUCCEEDED](result))
    } catch (error) {
        yield put(actions[userTypes.GET_SUGGEST_FRIENDS_FAILED](error))
    }
}

export function* getUserSaga(action: any): Generator<any, any, any> {
    try {
        const user = yield call(API.getUser, action.payload.userId)
        yield put(actions[userTypes.GET_USER_SUCCEEDED](user))
    } catch (error) {
        yield put(actions[userTypes.GET_USER_FAILED](error))
    }
}

export function* addFriend(action: any): Generator<any, any, any> {
    try {
        const result = yield call(API.addFriend, action.payload)
        yield put(actions[userTypes.ADD_FRIEND_SUCCEEDED](result))
        toast.success(result.message)
    } catch (error) {
        yield put(actions[userTypes.ADD_FRIEND_FAILED](error))
    }
}

export function* logoutSaga(action: any): Generator<any, any, any> {
    try {
        window.location.href = "/"
    } catch (error) {
        console.log("error", error)
        yield put(actions[userTypes.USER_LOGIN_FAILED](error))
    }
}

export function* searchSaga(action: any): Generator<any, any, any> {
    try {
        const searchData = yield call(API.search, action.payload)
        yield put(actions[userTypes.SEARCH_SUCCESS](searchData.data))
    } catch (error) {
        yield put(actions[userTypes.SEARCH_FAILURE](error))
    }
}

export function* acceptFriend(action: any): Generator<any, any, any> {
    try {
        console.log("action", action)
        const accept = yield call(API.acceptFriend, action.payload)
        console.log("accept", accept)
        yield put(actions[userTypes.ACCEPT_FRIEND_SUCCESS](accept))
    } catch (error) {
        yield put(actions[userTypes.ACCEPT_FRIEND_FAILURE](error))
    }
}

export function* rejectFriend(action: any): Generator<any, any, any> {
    try {
        const reject = yield call(API.rejectFriend, action.payload)
        yield put(actions[userTypes.REJECT_FRIEND_SUCCESS](reject))
    } catch (error) {
        yield put(actions[userTypes.REJECT_FRIEND_FAILURE](error))
    }
}

export function* deleteFriend(action: any): Generator<any, any, any> {
    try {
        const deleteFriend = yield call(API.deleteFriend, action.payload)
        yield put(actions[userTypes.DELETE_FRIEND_SUCCESS](deleteFriend))
    } catch (error) {
        yield put(actions[userTypes.DELETE_FRIEND_FAILURE](error))
    }
}

export default function* userSaga() {
    yield all([
        takeLatest(actions[userTypes.GET_SUGGEST_FRIENDS].type, getSuggestFriends),
        takeLatest(actions[userTypes.LOGOUT].type, logoutSaga),
        takeLatest(actions[userTypes.SEARCH_REQUEST].type, searchSaga),
        takeLatest(actions[userTypes.GET_USER].type, getUserSaga),
        takeLatest(actions[userTypes.ADD_FRIEND].type, addFriend),
        takeLatest(actions[userTypes.ACCEPT_FRIEND_REQUEST].type, acceptFriend),
        takeLatest(actions[userTypes.REJECT_FRIEND_REQUEST].type, rejectFriend),
        takeLatest(actions[userTypes.DELETE_FRIEND_REQUEST].type, deleteFriend),
    ])
}
