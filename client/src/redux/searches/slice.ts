import { createSlice } from "@reduxjs/toolkit"
import { Status } from "../types"
import searchTypes from "./types"

const initialState: { status: Status; message: string; error?: string; data: any } = {
    status: "idle",
    message: "",
    error: undefined,
    data: {},
}

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        [searchTypes.SEARCH_REQUEST]: (state) => {
            state.status = "pending"
        },
        [searchTypes.SEARCH_SUCCESS]: (state, action) => {
            state.status = "succeeded"
            state.message = action.payload.message
            state.data = action.payload.data
        },
        [searchTypes.SEARCH_FAILURE]: (state, action) => {
            state.status = "failed"
            state.message = action.payload.message
            state.error = action.payload.error
        },
    },
})

export const searchActions = searchSlice.actions

const searchReducer = searchSlice.reducer

export default searchReducer
