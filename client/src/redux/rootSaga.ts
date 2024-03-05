import { all, fork } from "redux-saga/effects"
import userSaga from "./saga/user.saga"
import suggestFriendSaga from "./saga/suggestFriend.saga"
import inviteSaga from "./saga/invite.saga"
import chatSaga from "./saga/chat.saga"
import { watchSearchSaga } from "./saga/search.saga"
import alertSaga from "./saga/alert.saga"
import friendSaga from "./saga/friend.saga"
import messageSaga from "./saga/message.saga"

export default function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(friendSaga),
        fork(suggestFriendSaga),
        fork(inviteSaga),
        fork(chatSaga),
        fork(messageSaga),
        fork(watchSearchSaga),
        fork(alertSaga),
    ])
}
