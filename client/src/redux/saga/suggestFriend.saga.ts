import API from "../api/suggestFriend.api"
import { all, call, put, takeLatest } from "redux-saga/effects"
import { suggestFriendActions } from "../slice/suggestFriends.slice"
import { suggestFriendTypes } from "../type/suggestFriends.type"

function* getSuggestFriends(): Generator<any, any, any> {
    try {
        const result = yield call(API.getSuggestFriends)
        yield put(suggestFriendActions[suggestFriendTypes.GET_SUGGEST_FRIENDS_SUCCESS](result))
    } catch (error) {
        yield put(suggestFriendActions[suggestFriendTypes.GET_SUGGEST_FRIENDS_FAILED](error))
    }
}

export default function* suggestFriendSaga() {
    yield all([takeLatest(suggestFriendTypes.GET_SUGGEST_FRIENDS, getSuggestFriends)])
}
