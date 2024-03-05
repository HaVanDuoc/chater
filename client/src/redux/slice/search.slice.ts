import { createSlice } from "@reduxjs/toolkit"
import { Status } from "../types"
import searchTypes from "../type/search.type"

interface SearchState {
    status: Status
    message: string
    data: any
}

const initialState: SearchState = {
    status: "idle",
    message: "",
    data: null,
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
        },
    },
})

export const searchActions = searchSlice.actions

const searchReducer = searchSlice.reducer

export default searchReducer
