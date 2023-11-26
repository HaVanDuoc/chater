import { all, fork } from "redux-saga/effects"
import userSaga from "./users/sagas"
import chatSaga from "./chats/sagas"
import watchConfirmDialog from "./confirmDialog/sagas"

export default function* rootSaga() {
    yield all([fork(userSaga), fork(chatSaga), fork(watchConfirmDialog)])
}
