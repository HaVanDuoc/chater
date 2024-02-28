import API from "../api/user.api"
import { types } from "../type/user.type"
import { actions } from "../slice/user.slice"
import { all, call, put, takeLatest } from "redux-saga/effects"
import { toast } from "react-toastify"

// Current user - Session Login
export function* getCurrentUserSaga(): Generator<any, any, any> {
    try {
        const result = yield call(API.getCurrentUser)

        if (result.error) {
            yield put(actions[types.GET_CURRENT_USER_FAILED](result.message))
        }

        return yield put(actions[types.GET_CURRENT_USER_SUCCEEDED](result))
    } catch (error: any) {
        return yield put(actions[types.GET_CURRENT_USER_FAILED](error.response.data.message))
    }
}

export function* getSuggestFriends(): Generator<any, any, any> {
    try {
        const result = yield call(API.getSuggestFriends)
        if (result.error) return yield put(actions[types.GET_SUGGEST_FRIENDS_FAILED](result))
        yield put(actions[types.GET_SUGGEST_FRIENDS_SUCCEEDED](result))
    } catch (error) {
        yield put(actions[types.GET_SUGGEST_FRIENDS_FAILED](error))
    }
}

export function* getUserSaga(action: any): Generator<any, any, any> {
    try {
        const user = yield call(API.getUser, action.payload.userId)
        yield put(actions[types.GET_USER_SUCCEEDED](user))
    } catch (error) {
        yield put(actions[types.GET_USER_FAILED](error))
    }
}

export function* addFriend(action: any): Generator<any, any, any> {
    try {
        const result = yield call(API.addFriend, action.payload)
        yield put(actions[types.ADD_FRIEND_SUCCEEDED](result))
        toast.success(result.message)
    } catch (error) {
        yield put(actions[types.ADD_FRIEND_FAILED](error))
    }
}

export function* logoutSaga(action: any): Generator<any, any, any> {
    try {
        window.location.href = "/"
    } catch (error) {
        console.log("error", error)
        yield put(actions[types.USER_LOGIN_FAILED](error))
    }
}

export function* searchSaga(action: any): Generator<any, any, any> {
    try {
        const searchData = yield call(API.search, action.payload)
        yield put(actions[types.SEARCH_SUCCESS](searchData.data))
    } catch (error) {
        yield put(actions[types.SEARCH_FAILURE](error))
    }
}

export function* acceptFriend(action: any): Generator<any, any, any> {
    try {
        console.log("action", action)
        const accept = yield call(API.acceptFriend, action.payload)
        console.log("accept", accept)
        yield put(actions[types.ACCEPT_FRIEND_SUCCESS](accept))
    } catch (error) {
        yield put(actions[types.ACCEPT_FRIEND_FAILURE](error))
    }
}

export function* rejectFriend(action: any): Generator<any, any, any> {
    try {
        const reject = yield call(API.rejectFriend, action.payload)
        yield put(actions[types.REJECT_FRIEND_SUCCESS](reject))
    } catch (error) {
        yield put(actions[types.REJECT_FRIEND_FAILURE](error))
    }
}

export function* deleteFriend(action: any): Generator<any, any, any> {
    try {
        const deleteFriend = yield call(API.deleteFriend, action.payload)
        yield put(actions[types.DELETE_FRIEND_SUCCESS](deleteFriend))
    } catch (error) {
        yield put(actions[types.DELETE_FRIEND_FAILURE](error))
    }
}

export default function* userSaga() {
    yield all([
        takeLatest(actions[types.GET_CURRENT_USER].type, getCurrentUserSaga),
        takeLatest(actions[types.GET_SUGGEST_FRIENDS].type, getSuggestFriends),
        takeLatest(actions[types.LOGOUT].type, logoutSaga),
        takeLatest(actions[types.SEARCH_REQUEST].type, searchSaga),
        takeLatest(actions[types.GET_USER].type, getUserSaga),
        takeLatest(actions[types.ADD_FRIEND].type, addFriend),
        takeLatest(actions[types.ACCEPT_FRIEND_REQUEST].type, acceptFriend),
        takeLatest(actions[types.REJECT_FRIEND_REQUEST].type, rejectFriend),
        takeLatest(actions[types.DELETE_FRIEND_REQUEST].type, deleteFriend),
    ])
}
