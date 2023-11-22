import instance from "~/utils/instanceAxios"
import { IUser, TypeInvite } from "./interfaces"

namespace Api {
    export const login = async (access_token: string) => {
        try {
            const response = await instance.post(`/auth/login`, {
                access_token,
            })
            return response.data
        } catch (error) {
            return error
        }
    }

    export const search = async (key: string) => {
        try {
            const response = await instance.post(`/user/search`, {
                key,
            })
            return response.data
        } catch (error) {
            return error
        }
    }

    export const getUser = async (data: IUser) => {
        try {
            const response = await instance.post(`/user/getUser`, { data })
            return response.data
        } catch (error) {
            return error
        }
    }

    export const requestFriend = async (data: { receiver: string; type?: TypeInvite }) => {
        try {
            data["type"] = "FRIEND REQUEST"
            console.log("data in api", data)
            const response = await instance.post(`/user/requestFriend`, data)
            return response.data
        } catch (error) {
            return error
        }
    }

    export const acceptFriend = async (invite_id: string) => {
        try {
            const response = await instance.post(`/user/requestFriend/accept`, {
                invite: invite_id,
            })
            return response.data
        } catch (error) {
            return error
        }
    }

    export const rejectFriend = async (data: { invite: string }) => {
        try {
            console.log("data in api", data)

            const response = await instance.post(`/user/requestFriend/reject`, data)
            return response.data
        } catch (error) {
            return error
        }
    }
}

export default Api
