import api from "~/config/api.config"
import { IUser } from "../interface/user.interface"

namespace API {
    export const getCurrentUser = async () => {
        try {
            const response = await api.get("/auth/login/success")
            return response.data
        } catch (error: any) {
            return error.response.data
        }
    }

    export const getSuggestFriends = async () => {
        try {
            const response = await api.get("/search/suggest")
            return response.data
        } catch (error) {
            return error
        }
    }

    export const getUser = async (userId: string) => {
        try {
            const response = await api.get(`/user/${userId}`)
            return response.data
        } catch (error) {
            return error
        }
    }

    export const addFriend = async (receiver: string) => {
        try {
            const response = await api.post(`/user/${receiver}/add`)
            console.log("response", response)
            return response.data
        } catch (error) {
            return error
        }
    }

    export const search = async (key: string) => {
        try {
            const response = await api.post(`/user/search`, {
                key,
            })
            return response.data
        } catch (error) {
            return error
        }
    }

    export const acceptFriend = async (invite_id: string) => {
        try {
            const response = await api.post(`/user/requestFriend/accept`, {
                invite: invite_id,
            })
            return response.data
        } catch (error) {
            return error
        }
    }

    export const rejectFriend = async (data: { invite: string }) => {
        try {
            const response = await api.post(`/user/requestFriend/reject`, data)
            return response.data
        } catch (error) {
            return error
        }
    }

    export const deleteFriend = async (friendId: IUser["_id"]) => {
        try {
            const response = await api.delete(`/user/deleteFriend/${friendId}`)
            return response.data
        } catch (error) {
            return error
        }
    }
}

export default API
