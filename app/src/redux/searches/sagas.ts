import { all, call, put, takeLatest } from "redux-saga/effects"
import Api from "./api"
import { searchActions } from "./slice"
import searchTypes from "./types"

export function* searchSaga(action: any): Generator<any, any, any> {
    try {
        const search = yield call(Api.search, action.payload.key)
        if (search) {
            yield put(searchActions[searchTypes.SEARCH_SUCCESS](search))
        }
    } catch (error) {
        yield put(searchActions[searchTypes.SEARCH_FAILURE](error))
    }
}

export function* watchSearchSaga() {
    yield all([takeLatest(searchActions[searchTypes.SEARCH_REQUEST].type, searchSaga)])
}
