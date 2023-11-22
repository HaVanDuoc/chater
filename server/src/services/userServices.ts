import { Schema } from "mongoose"
import Invite, { IInvite } from "../models/Invite"
import User, { IUser } from "../models/User"
import executeDB from "./db"

namespace UserServices {
    export const getUser = async (data: IUser) => {
        try {
            const user = await User.findOne(data)
                .populate({ path: "role", select: "name" })
                // .populate({ path: "status", select: "name" })
                .populate({ path: "friends", select: "-createdAt -updateAt -__v" })
                .exec()

            return { message: "Get data succeeded", data: user }
        } catch (error) {
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
            const result = await User.find({
                $and: [{ _id: { $ne: userId } }],
                $or: [
                    { name: { $regex: key, $options: "i" } },
                    { email: { $regex: key, $options: "i" } },
                ],
            })
                .select("name email picture")
                .exec()

            return { message: "Get data succeeded", data: result }
        } catch (error) {
            return error
        }
    }

    export const requestFriend = async ({ sender, receiver, type }: IInvite) => {
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
            if (check) {
                return { message: "Cả hai đã là bạn!" }
            }

            // const addYou = await User.findByIdAndUpdate(myId, { $push: { friends: friendId } })
            // const addMe = await User.findByIdAndUpdate(friendId, { $push: { friends: myId } })

            const data = {
                type,
                sender,
                receiver,
            }
            const createInvite = await Invite.create(data)

            if (createInvite) {
                return { message: "Đã gửi yêu cầu kết bạn!" }
            }

            return { message: "Error! Please again." }
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
}

export default UserServices
