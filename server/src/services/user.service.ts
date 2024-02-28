import { Schema } from "mongoose"
import Invite, { IInvite } from "../models/Invite"
import User, { IUser } from "../models/User"
import executeDB from "./db"

namespace UserServices {
    export const getUser = async (userId: string) => {
        try {
            const user = await User.findById(userId).exec()
            return { message: "Get data succeeded", user }
        } catch (error) {
            return error
        }
    }

    export const addFriend = async (
        sender: Schema.Types.ObjectId,
        receiver: Schema.Types.ObjectId,
    ) => {
        const checkFriend = async () => {
            const user = await User.findById(sender)
            if (user) {
                const friend = user.friends.find((id: any) => id === receiver)
                return friend
            }
            return null
        }

        try {
            // check friends
            const check = await checkFriend()
            if (check) return { error: true, message: "Cả hai đã là bạn!" }

            // Đầu tiên tìm và cập nhật nếu không có thì tạo một lời mời
            const findOneAndUpdate = await Invite.findOneAndUpdate({ sender, receiver })
            if (!findOneAndUpdate) await Invite.create({ sender, receiver })
            return { message: "Đã gửi yêu cầu kết bạn!" }
        } catch (error) {
            console.log("error - addFriend - user.services.ts", error)
            return error
        }
    }

    export const getOne = async (userId: any) => {
        try {
            const user = await User.findOne({ _id: userId })
                .populate({ path: "role", select: "name" })
                // .populate({ path: "status", select: "name" })
                .populate({ path: "friends", select: "-createdAt -updateAt -__v" })
                .exec()

            return { message: "Get data succeeded", data: user }
        } catch (error) {
            return error
        }
    }

    export const search = async (key: string, userId: IUser["_id"]) => {
        try {
            const current_user = await User.findById(userId).select("friends").exec()

            var result: { friends: any[]; others: any[] } = {
                friends: [],
                others: [],
            }

            // Search in list friends
            const friends = await User.find({
                $and: [{ _id: { $ne: userId } }, { _id: { $in: current_user?.friends } }],
                $or: [
                    { name: { $regex: key, $options: "i" } },
                    { email: { $regex: key, $options: "i" } },
                ],
            })
                .select("name email picture")
                .exec()

            if (friends.length) {
                result.friends = friends
            } else {
                const others = await User.find({
                    $and: [{ _id: { $ne: userId } }],
                    $or: [
                        { name: { $regex: key, $options: "i" } },
                        { email: { $regex: key, $options: "i" } },
                    ],
                })
                    .select("name email picture")
                    .exec()

                result.others = others
            }

            return { message: "Get data succeeded", data: result }
        } catch (error) {
            return error
        }
    }

    export const acceptInviteRequestFriend = async (invite: Schema.Types.ObjectId) => {
        try {
            const inviteData = await Invite.findById(invite)

            if (inviteData) {
                const sender = inviteData.sender
                const receiver = inviteData.receiver

                const addReceiverToSenderListFriends = await User.findByIdAndUpdate(sender, {
                    $push: { friends: receiver },
                })
                const addSenderToReceiverListFriends = await User.findByIdAndUpdate(receiver, {
                    $push: { friends: sender },
                })
                const updateInvite = await Invite.findByIdAndUpdate(invite, { status: "accept" })
                const members = [sender, receiver]
                const createChat: any = await executeDB.createChat({ members })
                const pushChatToEveryMember = members.map(async (member) => {
                    await User.findByIdAndUpdate(member, { $push: { chats: createChat?._id } })
                })

                if (
                    addReceiverToSenderListFriends &&
                    addSenderToReceiverListFriends &&
                    updateInvite &&
                    pushChatToEveryMember
                ) {
                    return { message: "Đã đồng ý kết bạn!" }
                }

                return { message: "Error! Please again." }
            }
        } catch (error) {
            return error
        }
    }

    export const rejectInviteRequestFriend = async (invite: Schema.Types.ObjectId) => {
        try {
            const reject = await Invite.findByIdAndUpdate(invite, { status: "reject" })

            if (reject) {
                return { message: "Đã từ chối kết bạn!" }
            }
        } catch (error) {
            return error
        }
    }

    export const deleteFriend = async (current_user_id: string, others_id: string) => {
        const checkFriend = async () => {
            const user = await User.findById(current_user_id)
            if (user) {
                const friend = user.friends.find((id: any) => id === others_id)
                return friend
            }
            return null
        }

        try {
            // check friends
            const check = await checkFriend()
            if (!check) {
                return { message: "Cả hai chưa từng là bạn!" }
            }

            const deleteInCurrentUser = await User.findByIdAndDelete(current_user_id, {
                $pull: { friends: others_id },
            })
            const deleteInOthers = await User.findByIdAndUpdate(others_id, {
                $pull: { friends: current_user_id },
            })

            if (deleteInCurrentUser && deleteInOthers) {
                return { message: "Đã hủy kết bạn!" }
            }

            return { message: "Error! Please again." }
        } catch (error) {
            return error
        }
    }
}

export default UserServices
