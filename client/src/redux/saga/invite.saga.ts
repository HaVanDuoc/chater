import API from "../api/invite.api"
import { inviteTypes } from "../type/invite.type"
import { inviteActions } from "../slice/invite.slice"
import { all, call, put, select, takeLatest } from "redux-saga/effects"
import { toast } from "react-toastify"
import { selectSocket } from "../selectors"

// GET LIST INVITE
function* getListInvites(): Generator<any, any, any> {
    try {
        const invites = yield call(API.getListInvites)
        yield put(inviteActions[inviteTypes.GET_LIST_INVITES_SUCCESS](invites))
    } catch (error) {
        yield put(inviteActions[inviteTypes.GET_LIST_INVITES_FAILED](error))
        console.log("ERROR: Saga get list invites failed!", error)
    }
}

// Send Invite
function* sendInvite(action: any): Generator<any, any, any> {
    try {
        const user_id = action.payload
        const socket = yield select(selectSocket)
        const result = yield call(API.sendInvite, user_id)

        if (result) {
            yield put(inviteActions[inviteTypes.SEND_INVITE_SUCCESS](result))
            socket.socket.emit("sendInvite", result.data)
            toast.success(result.message)
        }
    } catch (error) {
        yield put(inviteActions[inviteTypes.SEND_INVITE_FAILED](error))
    }
}

// ACCEPT
function* acceptInvite(action: any): Generator<any, any, any> {
    try {
        const socket = yield select(selectSocket)
        const accept = yield call(API.acceptInvite, action.payload)
        const { invite, chat } = accept.data

        if (accept) {
            yield put(inviteActions[inviteTypes.ACCEPT_INVITE_SUCCESS](invite))
            socket.socket.emit("acceptInvite", { invite, chat })
            toast.success(accept.invite.message)
        }
    } catch (error) {
        yield put(inviteActions[inviteTypes.ACCEPT_INVITE_FAILED](error))
    }
}

// REJECT
function* rejectInvite(action: any): Generator<any, any, any> {
    try {
        console.log("Reject Invite")
        const socket = yield select(selectSocket)
        const reject = yield call(API.rejectInvite, action.payload)
   
        if (reject) {
            yield put(inviteActions[inviteTypes.REJECT_INVITE_SUCCESS](reject))
            const sender_id = reject.data.sender
            socket.socket.emit("rejectInvite", sender_id)
            toast.success(reject.message)
        }
    } catch (error) {
        yield put(inviteActions[inviteTypes.REJECT_INVITE_FAILED](error))
    }
}

// Redeem
function* redeemInvite(action: any): Generator<any, any, any> {
    try {
        const socket = yield select(selectSocket)
        const redeem = yield call(API.redeemInvite, action.payload)
        if (redeem) {
            yield put(inviteActions[inviteTypes.REDEEM_INVITE_SUCCESS](redeem))
            socket.socket.emit("sendInvite", redeem.data)
            toast.success(redeem.message)
        }
    } catch (error) {
        yield put(inviteActions[inviteTypes.REDEEM_INVITE_FAILED](error))
    }
}

export default function* inviteSaga() {
    yield all([
        takeLatest(inviteTypes.GET_LIST_INVITES, getListInvites),
        takeLatest(inviteTypes.SEND_INVITE, sendInvite),
        takeLatest(inviteTypes.ACCEPT_INVITE, acceptInvite),
        takeLatest(inviteTypes.REJECT_INVITE, rejectInvite),
        takeLatest(inviteTypes.REDEEM_INVITE, redeemInvite),
    ])
}
