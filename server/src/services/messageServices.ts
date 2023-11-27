import { HttpStatusCode } from "axios"
import Chat, { IChat } from "../models/Chat"
import Message, { IMessage } from "../models/Message"

namespace MessageServices {
    export const sendMessage = async (data: IMessage) => {
        try {
            const newMessage = await Message.create({
                chat: data?.chat,
                sender: data?.sender,
                content: data?.content,
                reply: data?.reply,
            })

            if (newMessage) {
                return { message: "Đã gửi tin nhắn!", data: newMessage }
            }
        } catch (error) {
            return error
        }
    }
    export const fetchMessage = async (chatId: string) => {
        try {
            const findChat = await Chat.findById(chatId).exec()

            if (findChat) {
                const fetchMessage = await Message.find({ chat: chatId })
                    .populate("sender", "name picture")
                    .exec()

                return { message: "Fetch thành công", data: fetchMessage }
            } else {
                return {
                    error: HttpStatusCode.NotFound,
                    message: "Không tìm thấy cuộc trò chuyện!",
                }
            }
        } catch (error) {
            return error
        }
    }
}

export default MessageServices
