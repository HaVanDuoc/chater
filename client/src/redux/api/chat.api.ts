import api from "~/config/api.config"

namespace API {
    export const getListChats = async () => {
        const response = await api.get(`/chat`)
        return response.data
    }

    // export const getChat = async (chatId: any) => {
    //     const response = await api.get(`/chat/${chatId}`)
    //     return response.data
    // }

    // export const getMessages = async (chatId: any) => {
    //     const response = await api.get(`/message/${chatId}`)
    //     return response.data
    // }

    // export const deleteChat = async (chatId: IChat["_id"]) => {
    //     const response = await api.delete(`/chat/${chatId}`)
    //     return response ? response.data : []
    // }
}

export default API
