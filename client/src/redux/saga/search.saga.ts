import { all, call, put, takeLatest } from "redux-saga/effects"
import { searchActions } from "../slice/search.slice"
import searchTypes from "../type/search.type"
import API from "../api/search.api"

export function* searchSaga(action: any): Generator<any, any, any> {
    try {
        const search = yield call(API.search, action.payload.key)
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
