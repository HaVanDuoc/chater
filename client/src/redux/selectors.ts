import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "./store"

export const selectAuth = createSelector(
    (state: RootState) => state.auth,
    (auth) => auth,
)

export const selectInvite = createSelector(
    (state: RootState) => state.invites,
    (invite) => invite,
)

export const selectUser = createSelector(
    (state: RootState) => state.users,
    (user) => user,
)

export const selectChat = createSelector(
    (state: RootState) => state.chats,
    (chats) => chats,
)

export const selectConfirmDialog = createSelector(
    (state: RootState) => state.confirmDialog,
    (confirmDialog) => confirmDialog,
)

export const selectMessage = createSelector(
    (state: RootState) => state.messages,
    (messages) => messages,
)

export const selectSearch = createSelector(
    (state: RootState) => state.searches,
    (searches) => searches,
)
