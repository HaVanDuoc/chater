import api from "~/config/api.config"
import { IChat } from "./interfaces"

namespace Api {
    export const fetchChat = async (chatId: IChat["_id"]) => {
        const response = await api.get(`/chat/getChat/${chatId}`)
        return response ? response.data : []
    }

    export const deleteChat = async (chatId: IChat["_id"]) => {
        const response = await api.delete(`/chat/${chatId}`)
        return response ? response.data : []
    }
}

export default Api
