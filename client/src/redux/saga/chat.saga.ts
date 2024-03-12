import API from "../api/chat.api"
import APIUser from "../api/user.api"
import { all, call, put, select, takeLatest } from "redux-saga/effects"
import { chatActions } from "../slice/chat.slice"
import { chatTypes } from "../type/chat.type"
import { selectCurrentUser, selectSocket } from "../selectors"
import { toast } from "react-toastify"
import { currentUserActions } from "../slice/currentUser.slice"
import { currentUserTypes } from "../type/currentUser.type"

function* getListChats(): Generator<any, any, any> {
    try {
        const chats = yield call(API.getListChats)
        yield put(chatActions[chatTypes.GET_LIST_CHATS_SUCCESS](chats))
    } catch (error) {
        yield put(chatActions[chatTypes.GET_LIST_CHATS_FAILED](error))
    }
}

function* deleteChat(action: any): Generator<any, any, any> {
    try {
        const chat_id = action.payload

        const socket = yield select(selectSocket)
        const deleteChat = yield call(API.deleteChat, chat_id)

        if (!deleteChat.group) {
            const currentUser = yield select(selectCurrentUser)
            const friend_id = deleteChat.data.members.find(
                (member: any) => member !== currentUser.data._id,
            )
            if (friend_id) {
                const deleteFriend = yield call(APIUser.deleteFriend, friend_id)
                if (deleteFriend) {
                    toast.success(deleteFriend.message)
                }
            }
            if (socket) socket.socket.emit("deleteFriend", { friend_id, chat_id: deleteChat._id })
        } else {
            toast.success(deleteChat.message)
        }

        yield put(chatActions[chatTypes.DELETE_CHAT_SUCCESS](deleteChat))
    } catch (error) {
        yield put(chatActions[chatTypes.DELETE_CHAT_FAILED](error))
    }
}

export default function* chatSaga() {
    yield all([
        takeLatest(chatTypes.GET_LIST_CHATS, getListChats),
        takeLatest(chatActions[chatTypes.DELETE_CHAT].type, deleteChat),
    ])
}
