import Api from "./api"
import chatTypes from "./types"
import { chatActions } from "./slice"
import { all, call, put, takeLatest } from "redux-saga/effects"

export function* fetchChat(action: any): Generator<any, any, any> {
    try {
        const chats = yield call(Api.fetchChat, action.payload)
        yield put(chatActions[chatTypes.FETCH_CHAT_SUCCESS](chats))
    } catch (error) {
        yield put(chatActions[chatTypes.FETCH_CHAT_FAILURE](error))
    }
}

export function* deleteChat(action: any): Generator<any, any, any> {
    try {
        const deleteChat = yield call(Api.deleteChat, action.payload)
        yield put(chatActions[chatTypes.DELETE_CHAT_SUCCESS](deleteChat))
    } catch (error) {
        yield put(chatActions[chatTypes.DELETE_CHAT_FAILURE](error))
    }
}

export default function* chatSaga() {
    yield all([
        takeLatest(chatActions[chatTypes.FETCH_CHAT_REQUEST].type, fetchChat),
        takeLatest(chatActions[chatTypes.DELETE_CHAT_REQUEST].type, deleteChat),
    ])
}
