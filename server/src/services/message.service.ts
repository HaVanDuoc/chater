import Message, { IMessage } from "../models/Message"

namespace MessageServices {
    export const sendMessage = async (data: IMessage) => {
        try {
            const newMessage = await Message.create({
                chat: data.chat,
                sender: data.sender,
                content: data.content,
                reply: data?.reply,
            })

            if (newMessage) {
                return { message: "Đã gửi tin nhắn!", data: newMessage }
            }
        } catch (error) {
            return error
        }
    }

    export const getMessages = async (chatId: string) => {
        try {
            const messages = await Message.find({ chat: chatId })
                .select("sender content createdAt updatedAt")
                .populate("sender", "displayName picture")
                .limit(50)
                .exec()

            return { message: "Get messages success", messages: messages }
        } catch (error) {
            return error
        }
    }
}

export default MessageServices
