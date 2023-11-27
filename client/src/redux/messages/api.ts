import instance from "~/utils/instanceAxios"
import { IMessage } from "./interfaces"

namespace Api {
    export const fetchMessage = async (chatId: string) => {
        try {
            const response = await instance.get(`/message/${chatId}`)
            return response.data
        } catch (error) {
            throw new Error("API fetchMessage error!")
        }
    }
    export const sendMessage = async (data: {
        chat: IMessage["chat"]
        content: IMessage["content"]
        reply?: IMessage["reply"]
    }) => {
        try {
            const response = await instance.post(`/message/send`, data)
            return response.data
        } catch (error) {
            throw new Error("API sendMessage error!")
        }
    }
}

export default Api
