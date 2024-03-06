import API from "../api/user.api"
import { all, call, put, takeLatest } from "redux-saga/effects"

import { userActions } from "../slice/user.slice"
import { userTypes } from "../type/user.type"
import { purgeState } from "../store"

function* getUserSaga(action: any): Generator<any, any, any> {
    try {
        const user = yield call(API.getUser, action.payload.userId)
        yield put(userActions[userTypes.GET_USER_SUCCEEDED](user))
    } catch (error) {
        yield put(userActions[userTypes.GET_USER_FAILED](error))
    }
}

function* logoutSaga(): Generator<any, any, any> {
    try {
        purgeState()
    } catch (error) {
        yield put(userActions[userTypes.LOGOUT_FAILED](error))
    }
}

function* searchSaga(action: any): Generator<any, any, any> {
    try {
        const searchData = yield call(API.search, action.payload)
        yield put(userActions[userTypes.SEARCH_SUCCESS](searchData.data))
    } catch (error) {
        yield put(userActions[userTypes.SEARCH_FAILURE](error))
    }
}

function* acceptFriend(action: any): Generator<any, any, any> {
    try {
        console.log("action", action)
        const accept = yield call(API.acceptFriend, action.payload)
        console.log("accept", accept)
        yield put(userActions[userTypes.ACCEPT_FRIEND_SUCCESS](accept))
    } catch (error) {
        yield put(userActions[userTypes.ACCEPT_FRIEND_FAILURE](error))
    }
}

function* rejectFriend(action: any): Generator<any, any, any> {
    try {
        const reject = yield call(API.rejectFriend, action.payload)
        yield put(userActions[userTypes.REJECT_FRIEND_SUCCESS](reject))
    } catch (error) {
        yield put(userActions[userTypes.REJECT_FRIEND_FAILURE](error))
    }
}

function* deleteFriend(action: any): Generator<any, any, any> {
    try {
        const deleteFriend = yield call(API.deleteFriend, action.payload)
        yield put(userActions[userTypes.DELETE_FRIEND_SUCCESS](deleteFriend))
    } catch (error) {
        yield put(userActions[userTypes.DELETE_FRIEND_FAILURE](error))
    }
}

export default function* userSaga() {
    yield all([
        takeLatest(userActions[userTypes.GET_USER].type, getUserSaga),
        takeLatest(userActions[userTypes.LOGOUT_SUCCESS].type, logoutSaga),
        // takeLatest(userActions[userTypes.SEARCH_REQUEST].type, searchSaga),
        // takeLatest(userActions[userTypes.ADD_FRIEND].type, addFriend),
        // takeLatest(userActions[userTypes.ACCEPT_FRIEND_REQUEST].type, acceptFriend),
        // takeLatest(userActions[userTypes.REJECT_FRIEND_REQUEST].type, rejectFriend),
        // takeLatest(userActions[userTypes.DELETE_FRIEND_REQUEST].type, deleteFriend),
    ])
}
