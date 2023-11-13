import { createAction } from "@reduxjs/toolkit"
import ActionTypes from "./actionTypes"

export const getUser = createAction(ActionTypes.FETCH_USER)
