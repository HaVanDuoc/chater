import { all, call, put, takeLatest } from "redux-saga/effects"
import { messageActions } from "./slice"
import messageTypes from "./types"
import Api from "./api"

export function* fetchMessageSaga(action: any): Generator<any, any, any> {
    try {
        const fetch = yield call(Api.fetchMessage, action.payload.chatId)
        if (fetch) {
            yield put(messageActions[messageTypes.FETCH_MESSAGE_SUCCESS](fetch))
        }
    } catch (error) {
        yield put(messageActions[messageTypes.FETCH_MESSAGE_FAILURE](error))
    }
}

export function* sendMessageSaga(action: any): Generator<any, any, any> {
    try {
        const send = yield call(Api.sendMessage, action.payload)
        if (send) {
            yield put(messageActions[messageTypes.SEND_MESSAGE_SUCCESS](send))
        }
    } catch (error) {
        yield put(messageActions[messageTypes.SEND_MESSAGE_FAILURE](error))
    }
}

export function* watchMessageSaga() {
    yield all([
        takeLatest(messageActions[messageTypes.FETCH_MESSAGE_REQUEST].type, fetchMessageSaga),
        takeLatest(messageActions[messageTypes.SEND_MESSAGE_REQUEST].type, sendMessageSaga),
    ])
}
