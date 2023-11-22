import { all, call, put, takeLatest } from "redux-saga/effects"
import { actionsChat } from "./slice"
import typesChat from "./types"
import Api from "./api"

export function* fetchChat(action: any): Generator<any, any, any> {
    try {
        const chats = yield call(Api.fetchChat, action.payload)
        yield put(actionsChat[typesChat.FETCH_CHAT_SUCCESS](chats))
    } catch (error) {
        yield put(actionsChat[typesChat.FETCH_CHAT_FAILURE](error))
    }
}

export default function* chatSaga() {
    yield all([takeLatest(actionsChat[typesChat.FETCH_CHAT_REQUEST].type, fetchChat)])
}
