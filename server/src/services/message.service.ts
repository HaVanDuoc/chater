import Chat from "../models/Chat"
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
                const pushMessageToChat = await Chat.findByIdAndUpdate(data.chat, {
                    $push: { messages: newMessage._id },
                })

                const findNewMessage = await Message.findById(newMessage._id).populate(
                    "sender",
                    "displayName picture",
                )

                if (findNewMessage && pushMessageToChat) {
                    return { message: "Đã gửi tin nhắn!", data: findNewMessage }
                }
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
