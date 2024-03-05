import Chat, { IChat } from "../models/Chat"
import Message, { IMessage } from "../models/Message"
import User from "../models/User"

namespace ChatServices {
    export const getListChats = async (auth_id: any) => {
        try {
            const chats: (IChat & { messages?: IMessage[] })[] = await Chat.find({
                members: { $in: [auth_id] },
            })
                .populate({
                    path: "members",
                    select: "_id displayName picture",
                })
                .exec()

            const chatsWithMessages = await Promise.all(
                chats.map(async (chat) => {
                    const messages = await Message.find({ chat: chat._id })
                        .select("sender content createdAt updatedAt")
                        .populate("sender", "displayName picture")
                        .limit(50)
                        .exec()

                    // Trả về chat mới với messages được thêm vào
                    return { ...(chat as any).toObject(), messages }
                }),
            )

            return { message: "Get chats successful", chats: chatsWithMessages }
        } catch (error) {
            console.log("error getListChats Services", error)
            return { error: true, message: error }
        }
    }

    export const getChat = async (chatId: any) => {
        try {
            const chat = await Chat.findById(chatId)
                .populate("members", "displayName picture")
                .exec()

            const getMessages = await Message.find({ chat: chatId })
                .select("sender content updatedAt")
                .populate("sender", "displayName picture")
                .exec()

            return {
                message: "Get chat successful",
                chat: { id: chat?.id, members: chat?.members, messages: getMessages },
            }
        } catch (error) {
            console.log("error getChat Service", error)
            return { error: true, message: "Get chat failed" }
        }
    }

    export const getChatByUserId = async (current_user_id: any, other_user_id: any) => {
        try {
            const user = await User.findById(other_user_id)
                .populate({
                    path: "chats",
                    populate: {
                        path: "members",
                        select: "_id name picture",
                    },
                })
                .exec()

            return { message: "Get successful", data: user }
        } catch (error) {
            throw new Error("Login Failed")
        }
    }

    export const deleteChat = async (chatId: string) => {
        try {
            const deleteChat = await Chat.findByIdAndDelete(chatId)

            if (deleteChat) {
                return { message: "Đã xóa cuộc trò chuyện!" }
            }
        } catch (error) {
            throw new Error("Delete chat failed!")
        }
    }
}

export default ChatServices
