import { all, call, put, takeLatest } from "redux-saga/effects"
import { currentUserActions } from "../slice/currentUser.slice"
import { currentUserTypes } from "../type/currentUser.type"
import API from "../api/currentUser.api"

function* checkSession(): Generator<any, any, any> {
    try {
        const check = yield call(API.checkSession)
        yield put(currentUserActions[currentUserTypes.CHECK_SESSION_SUCCESS](check))
    } catch (error) {
        yield put(currentUserActions[currentUserTypes.CHECK_SESSION_FAILED](error))
    }
}

export default function* currentUserSaga() {
    yield all([takeLatest(currentUserActions[currentUserTypes.CHECK_SESSION].type, checkSession)])
}
