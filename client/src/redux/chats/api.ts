import instance from "~/utils/instanceAxios"
import { IChat } from "./interfaces"

namespace Api {
    export const fetchChat = async (chatId: IChat["_id"]) => {
        const response = await instance.get(`/chat/getChat/${chatId}`)
        return response ? response.data : []
    }
}

export default Api
