import { all, call, put, takeLatest } from "redux-saga/effects"
import { getUserData } from "./api"
import { IUser } from "./interfaces"
import { actions } from "./slice"
import ActionTypes from "./actionTypes"

export function* fetchUserSaga(action: { payload: IUser }): Generator<any, any, any> {
    try {
        yield put(actions[ActionTypes.FETCH_USER])
        const userData = yield call(getUserData, action.payload.id)
        yield put(actions[ActionTypes.FETCH_USER_SUCCEEDED](userData))
    } catch (error: any) {
        yield put(actions[ActionTypes.FETCH_USER_FAILED](error.message))
    }
}

export function* userSaga() {
    yield all([takeLatest(actions[ActionTypes.FETCH_USER], fetchUserSaga)])
}
