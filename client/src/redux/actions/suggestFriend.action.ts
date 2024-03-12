import { createAction } from "@reduxjs/toolkit"
import { suggestFriendTypes } from "../type/suggestFriends.type"

export const getSuggestFriends = () => {
    return createAction(suggestFriendTypes.GET_SUGGEST_FRIENDS)()
}
