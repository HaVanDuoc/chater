import api from "~/config/api.config"
import { IChat } from "../interface/chat.interface"

namespace API {
    export const getListChats = async () => {
        const response = await api.get(`/chat`)
        return response.data
    }

    export const deleteChat = async (chatId: IChat["_id"]) => {
        const response = await api.delete(`/chat/${chatId}`)
        return response.data
    }
}

export default API
