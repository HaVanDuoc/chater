import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "./store"

export const selectCurrentUser = createSelector(
    (state: RootState) => state.currentUser,
    (currentUser) => currentUser,
)

export const selectUser = createSelector(
    (state: RootState) => state.user,
    (user) => user,
)

export const selectFriend = createSelector(
    (state: RootState) => state.friend,
    (friend) => friend,
)

export const selectSuggestFriend = createSelector(
    (state: RootState) => state.suggestFriend,
    (suggestFriend) => suggestFriend,
)

export const selectAlert = createSelector(
    (state: RootState) => state.alert,
    (alert) => alert,
)

export const selectInvite = createSelector(
    (state: RootState) => state.invites,
    (invite) => invite,
)

export const selectChat = createSelector(
    (state: RootState) => state.chats,
    (chats) => chats,
)

export const selectMessage = createSelector(
    (state: RootState) => state.messages,
    (messages) => messages,
)

export const selectSearch = createSelector(
    (state: RootState) => state.searches,
    (searches) => searches,
)

export const selectSocket = createSelector(
    (state: RootState) => state.socket,
    (socket) => socket,
)
