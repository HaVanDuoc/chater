import ActionTypes from "./actionTypes"

export const requestLogin = (payload: any) => ({
    type: ActionTypes.USER_LOGIN_REQUEST,
    payload,
})
