import api from "~/config/api.config"

namespace API {
    export const getListInvites = async () => {
        try {
            const response = await api.get("/invite")
            return response.data
        } catch (error: any) {
            return error.response.data
        }
    }

    export const sendInvite = async (receiver: string) => {
        try {
            const response = await api.post(`/invite/${receiver}/send`)
            return response.data
        } catch (error) {
            return error
        }
    }

    export const acceptInvite = async (invite_id: string) => {
        try {
            const response = await api.post(`/invite/${invite_id}/accept`)
            return response.data
        } catch (error) {
            return error
        }
    }

    export const rejectInvite = async (invite_id: string) => {
        try {
            const response = await api.post(`/invite/${invite_id}/reject`)
            return response.data
        } catch (error) {
            return error
        }
    }

    export const redeemInvite = async (invite_id: string) => {
        try {
            const response = await api.post(`/invite/${invite_id}/redeem`)
            return response.data
        } catch (error) {
            return error
        }
    }
}

export default API
