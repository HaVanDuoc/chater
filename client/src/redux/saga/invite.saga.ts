import API from "../api/invite.api"
import { inviteTypes } from "../type/invite.type"
import { inviteActions } from "../slice/invite.slice"
import { all, call, put, takeLatest } from "redux-saga/effects"

// GET LIST INVITE
export function* getListInvites(): Generator<any, any, any> {
    try {
        const invites = yield call(API.getListInvites)
        yield put(inviteActions[inviteTypes.GET_LIST_INVITES_SUCCESS](invites))
    } catch (error) {
        console.log("ERROR: Saga get list invites failed!", error)
    }
}

// ACCEPT
export function* acceptInvite(action: any): Generator<any, any, any> {
    try {
        const accept = yield call(API.acceptInvite, action.payload)
        yield put(inviteActions[inviteTypes.ACCEPT_INVITE_SUCCESS](accept))
    } catch (error) {
        yield put(inviteActions[inviteTypes.ACCEPT_INVITE_FAILED](error))
    }
}

// REJECT
export function* rejectInvite(action: any): Generator<any, any, any> {
    try {
        const reject = yield call(API.rejectInvite, action.payload)
        yield put(inviteActions[inviteTypes.REJECT_INVITE_SUCCESS](reject))
    } catch (error) {
        yield put(inviteActions[inviteTypes.REJECT_INVITE_FAILED](error))
    }
}

export default function* inviteSaga() {
    yield all([
        takeLatest(inviteActions[inviteTypes.GET_LIST_INVITES].type, getListInvites),
        takeLatest(inviteActions[inviteTypes.ACCEPT_INVITE].type, acceptInvite),
        takeLatest(inviteActions[inviteTypes.REJECT_INVITE].type, rejectInvite),
    ])
}
