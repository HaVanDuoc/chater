import API from "../api/user.api"
import { all, call, put, select, takeLatest } from "redux-saga/effects"
import { userActions } from "../slice/user.slice"
import { userTypes } from "../type/user.type"
import { purgeState } from "../store"
import { selectUser } from "../selectors"

function* getUserSaga(action: any): Generator<any, any, any> {
    try {
        const userId = action.payload
        const user = yield select(selectUser)
        const status = user.getUser.status

        if (userId && status !== "pending") {
            const response = yield call(API.getUser, userId)
            yield put(userActions[userTypes.GET_USER_SUCCEEDED](response))
        }
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

export default function* userSaga() {
    yield all([
        takeLatest(userTypes.GET_USER, getUserSaga),
        takeLatest(userActions[userTypes.LOGOUT_SUCCESS].type, logoutSaga),
    ])
}
