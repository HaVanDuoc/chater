import { all, call, put, takeLatest } from "redux-saga/effects"
import API from "../api/chat.api"
import { chatActions } from "../slice/chat.slice"
import { chatTypes } from "../type/chat.type"

export function* getListChats(): Generator<any, any, any> {
    try {
        const chats = yield call(API.getListChats)
        yield put(chatActions[chatTypes.GET_LIST_CHATS_SUCCESS](chats))
    } catch (error) {
        yield put(chatActions[chatTypes.GET_LIST_CHATS_FAILED](error))
    }
}

// export function* getChat(action: any): Generator<any, any, any> {
//     try {
//         const chat = yield call(API.getChat, action.payload.chatId)
//         yield put(chatActions[chatTypes.GET_CHAT_SUCCESS](chat))
//     } catch (error) {
//         yield put(chatActions[chatTypes.GET_CHAT_FAILED](error))
//     }
// }

// export function* getMessages(action: any): Generator<any, any, any> {
//     try {
//         const messages = yield call(API.getMessages, action.payload.chatId)
//         yield put(
//             chatActions[chatTypes.GET_MESSAGES_SUCCESS]({
//                 messages: messages.messages,
//                 chatId: action.payload.chatId,
//             }),
//         )
//     } catch (error) {
//         yield put(chatActions[chatTypes.GET_MESSAGES_FAILED](error))
//     }
// }

// export function* deleteChat(action: any): Generator<any, any, any> {
//     try {
//         const deleteChat = yield call(Api.deleteChat, action.payload)
//         yield put(chatActions[chatTypes.DELETE_CHAT_SUCCESS](deleteChat))
//     } catch (error) {
//         yield put(chatActions[chatTypes.DELETE_CHAT_FAILURE](error))
//     }
// }

export default function* chatSaga() {
    yield all([
        takeLatest(chatActions[chatTypes.GET_LIST_CHATS].type, getListChats),
        // takeLatest(chatActions[chatTypes.GET_CHAT].type, getChat),
        // takeLatest(chatActions[chatTypes.GET_MESSAGES].type, getMessages),
        // takeLatest(chatActions[chatTypes.DELETE_CHAT_REQUEST].type, deleteChat),
    ])
}
