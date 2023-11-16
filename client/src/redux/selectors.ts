import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "./store"

export const selectUser = createSelector(
    (state: RootState) => state.users,
    (user) => user,
)

export const selectMessage = createSelector(
    (state: RootState) => state.message,
    (message) => message,
)
