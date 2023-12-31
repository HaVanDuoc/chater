import { Schema } from "mongoose"
import Invite, { IInvite } from "../../models/Invite"
import Chat, { IChat } from "../../models/Chat"
import User, { IUser } from "../../models/User"

namespace executeDB {
    export const getInvites = async (receiver_id: IInvite["receiver"]) => {
        const response = await Invite.find({ receiver: receiver_id, status: "waiting" })
            .populate("sender", "name picture")
            .select("sender")

        return response
    }

    // export const getChats = async (userId: any) => {
    //     try {
    //         const response = await User.findById(userId)
    //             .populate({
    //                 path: "chats",
    //                 populate: {
    //                     path: "members",
    //                     select: "_id name picture",
    //                 },
    //             })
    //             .exec()

    //         console.log("response", response)

    //         return response?.chats || []
    //     } catch (error) {
    //         throw new Error("Login Failed")
    //     }
    // }

    export const createChat = async (data: IChat) => {
        const response = await Chat.create(data)
        if (response) return response
        return false
    }
}

export default executeDB
