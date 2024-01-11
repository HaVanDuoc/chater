import { all, fork } from "redux-saga/effects"
import userSaga from "./users/sagas"
import chatSaga from "./chats/sagas"
import watchConfirmDialog from "./confirmDialog/sagas"
import { watchMessageSaga } from "./messages/sagas"
import { watchSearchSaga } from "./searches/sagas"

export default function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(chatSaga),
        fork(watchConfirmDialog),
        fork(watchMessageSaga),
        fork(watchSearchSaga),
    ])
}
