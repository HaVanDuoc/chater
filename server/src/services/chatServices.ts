import Chat from "../models/Chat"
import User, { IUser } from "../models/User"

namespace ChatServices {
    export const getByUserId = async (userId: any) => {
        try {
            const user = await User.findById(userId)
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

    export const getChatById = async (chatId: any) => {
        try {
            const data = await Chat.findById(chatId).populate("members", "name picture").exec()
            return { message: "Get successful", data: data }
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
