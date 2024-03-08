import Api from "../api/message.api"
import { messageTypes } from "../type/message.type"
import { all, call, put, select, takeLatest } from "redux-saga/effects"
import { messageActions } from "../slice/message.slice"
import { selectSocket } from "../selectors"

export function* sendMessageSaga(action: any): Generator<any, any, any> {
    try {
        const send = yield call(Api.sendMessage, action.payload)
        const room = send?.data?.chat
        const message = send?.data

        const socket = yield select(selectSocket)

        if (send && room && message) {
            yield put(messageActions[messageTypes.SEND_MESSAGE_SUCCESS](send))
            socket.socket.emit("sendMessage", { room, message })
        }
    } catch (error) {
        yield put(messageActions[messageTypes.SEND_MESSAGE_FAILED](error))
    }
}

export default function* messageSaga() {
    yield all([takeLatest(messageActions[messageTypes.SEND_MESSAGE].type, sendMessageSaga)])
}
