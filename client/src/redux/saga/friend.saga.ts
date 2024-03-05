import API from "../api/friend.api"
import { all, call, put, takeLatest } from "redux-saga/effects"
import { friendActions } from "../slice/friend.slice"
import { friendTypes } from "../type/friend.type"

export function* getListFriends(): Generator<any, any, any> {
    try {
        const result = yield call(API.getListFriends)
        yield put(friendActions[friendTypes.GET_LIST_FRIEND_SUCCESS](result))
    } catch (error) {
        yield put(friendActions[friendTypes.GET_LIST_FRIEND_FAILED](error))
    }
}

export default function* friendSaga() {
    yield all([takeLatest(friendActions[friendTypes.GET_LIST_FRIEND].type, getListFriends)])
}
