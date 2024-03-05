import Api from "../api/message.api"
import messageTypes from "../type/message.type"
import { all, call, put, takeLatest } from "redux-saga/effects"
import { messageActions } from "../slice/message.slice"
import { chatActions } from "../slice/chat.slice"
import { chatTypes } from "../type/chat.type"

export function* sendMessageSaga(action: any): Generator<any, any, any> {
    try {
        const send = yield call(Api.sendMessage, action.payload)
        console.log('send', send)
        if (send) {
            // yield put(chatActions[chatTypes.ADD_MESSAGE](send)) // Add message into redux
            yield put(messageActions[messageTypes.SEND_MESSAGE_SUCCESS](send))
        }
    } catch (error) {
        yield put(messageActions[messageTypes.SEND_MESSAGE_FAILED](error))
    }
}

export default function* messageSaga() {
    yield all([
        takeLatest(messageActions[messageTypes.SEND_MESSAGE].type, sendMessageSaga),
    ])
}
