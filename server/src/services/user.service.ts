import { Schema } from "mongoose"
import Invite from "../models/Invite"
import User, { IUser } from "../models/User"

namespace UserServices {
    export const getUser = async (auth_id?: any, user_id?: string) => {
        try {
            var res: any = {}

            // Get Info
            let user = await User.findById(user_id).exec()
            if (user) res = user

            // Check friend
            const isFriend = user?.friends.includes(auth_id)
            res["isFriend"] = isFriend

            // If not friend, check invite
            if (!isFriend) {
                const invite = await Invite.findOne({
                    $or: [
                        { receiver: auth_id, sender: user_id },
                        {
                            $and: [
                                { receiver: { $ne: auth_id } },
                                { sender: auth_id },
                                { receiver: user_id },
                            ],
                        },
                    ],
                })

                // Add invite into user, for response to client
                if (invite) {
                    res["invite"] = invite
                }
            }

            return { message: "Get data succeeded", user: res }
        } catch (error) {
            return error
        }
    }

    export const addFriend = async (
        sender: Schema.Types.ObjectId,
        receiver: Schema.Types.ObjectId,
    ) => {
        const checkFriend = async () => {
            const senderInfo = await User.findById(sender)
            if (senderInfo) {
                const friend = senderInfo.friends.find((id: any) => id === receiver)
                return friend
            }
            return null
        }

        try {
            // check friends
            const check = await checkFriend()
            if (check) return { error: true, message: "Cả hai đã là bạn!" }

            // Đầu tiên tìm và cập nhật nếu không có thì tạo một lời mời
            console.log("sender", sender)
            console.log("receiver", receiver)
            const findOneAndUpdate = await Invite.findOne({
                $and: [{ sender: sender }, { receiver: receiver }],
            })

            console.log("findOneAndUpdate", findOneAndUpdate)

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
