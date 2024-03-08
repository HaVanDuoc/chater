import instance from "~/config/api.config"
import { IMessage } from "../interface/message.interface"

namespace Api {
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
