import Chat from "../models/Chat"
import Role from "../models/Role"
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
}

export default ChatServices
