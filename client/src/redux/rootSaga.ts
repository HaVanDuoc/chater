import { all, fork } from "redux-saga/effects"
import watchConfirmDialog from "./confirmDialog/sagas"
import { watchMessageSaga } from "./messages/sagas"
import { watchSearchSaga } from "./searches/sagas"
import userSaga from "./saga/user.saga"
import inviteSaga from "./saga/invite.saga"
import chatSaga from "./saga/chat.saga"

export default function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(inviteSaga),
        fork(chatSaga),
        fork(watchConfirmDialog),
        fork(watchMessageSaga),
        fork(watchSearchSaga),
    ])
}
