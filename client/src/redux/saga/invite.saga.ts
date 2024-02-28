import API from "../api/invite.api"
import { types } from "../type/invite.type"
import { actions } from "../slice/invite.slice"
import { all, call, put, takeLatest } from "redux-saga/effects"
import { toast } from "react-toastify"

// GET INVITE
export function* getInviteSaga(): Generator<any, any, any> {
    try {
        const result = yield call(API.getInvite)
        yield put(actions[types.GET_INVITE_SUCCEEDED](result))
    } catch (error) {
        yield put(actions[types.GET_INVITE_FAILED](error))
    }
}

export default function* inviteSaga() {
    yield all([takeLatest(actions[types.GET_INVITE].type, getInviteSaga)])
}
