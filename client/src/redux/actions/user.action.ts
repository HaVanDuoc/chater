import { createAction } from "@reduxjs/toolkit"
import { userTypes } from "../type/user.type"
import { IUser } from "../interface/user.interface"

export const getUser = (userId: IUser["_id"]) => {
    return createAction<string>(userTypes.GET_USER)(userId)
}
