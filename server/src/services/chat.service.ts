import Chat from "../models/Chat"
import User from "../models/User"

namespace ChatServices {
    export const getListChats = async (auth_id: any) => {
        try {
            const chats = await Chat.find({ members: { $in: [auth_id] } })
                .populate({
                    path: "members",
                    select: "_id displayName picture",
                })
                .exec()

            return { message: "Get chats successful", chats: chats }
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
            return { message: "Get chat successful", chat: chat }
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
