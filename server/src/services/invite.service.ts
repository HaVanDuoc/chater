import { Schema } from "mongoose"
import Invite, { IInvite } from "../models/Invite"
import User from "../models/User"
import Chat from "../models/Chat"

namespace InviteService {
    // Get List Invites
    export const getListInvites = async (auth_id: string) => {
        try {
            const invites = await Invite.find({
                // receiver: auth_id,
                // $and: [{ status: "waiting" }],
                status: "waiting",
            })
                .populate("sender", "displayName picture email")
                .exec()
            return { message: "Get list invites success", invites }
        } catch (error) {
            console.log("error - invite.services.ts", error)
            return error
        }
    }

    // Send Invite
    export const sendInvite = async (
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

    // Accept Invite
    export const acceptInvite = async (
        invite_id: Schema.Types.ObjectId,
        current_user_id: Schema.Types.ObjectId,
    ) => {
        try {
            const invite = await Invite.findById(invite_id)
            const chatId = invite?.chatId

            // Has 2 types invite: Add friend and add group
            // if hasn't chatId => Add Friend
            // And vice versa

            if (invite && !chatId) {
                // First, case add friend
                // has 3 step:
                // 1. add friend together
                // 2. Update invite to status accept
                // final, create a chatbox for both

                const sender = invite.sender
                const receiver = invite.receiver

                // first, add friend
                const addReceiverToSenderListFriends = await User.findByIdAndUpdate(sender, {
                    $push: { friends: receiver },
                })
                const addSenderToReceiverListFriends = await User.findByIdAndUpdate(receiver, {
                    $push: { friends: sender },
                })

                // update status invite
                const updateInvite = await Invite.findByIdAndUpdate(invite_id, { status: "accept" })

                // create chatbox
                const members = [sender, receiver]
                const createChat: any = await Chat.create({ members })

                if (
                    addReceiverToSenderListFriends &&
                    addSenderToReceiverListFriends &&
                    updateInvite &&
                    createChat
                ) {
                    return { message: "Đã đồng ý kết bạn!" }
                }

                return { error: true, message: "Error! Please again." }
            } else {
                const addGroup = await Chat.findByIdAndUpdate(chatId, {
                    $push: { members: current_user_id },
                })

                if (addGroup) return { message: "Bạn đã tham gia nhóm chat!" }
            }
        } catch (error) {
            console.log("ERROR accept invite", error)
            return { error: true, message: "Error! Please again." }
        }
    }

    export const redeemInvite = async (invite_id: Schema.Types.ObjectId) => {
        try {
            const redeem = await Invite.findOneAndUpdate(invite_id, { status: "redeem" })
            return { message: "Đã thu hồi lời mời" }
        } catch (error) {
            console.log("ERROR redeemInvite services", error)
            return { error: true, message: "Error! Please again." }
        }
    }

    export const rejectInvite = async (invite: Schema.Types.ObjectId) => {
        try {
            const reject = await Invite.findByIdAndUpdate(invite, { status: "reject" })

            if (reject) {
                return { message: "Đã từ chối kết bạn!" }
            }
        } catch (error) {
            console.log("ERROR rejectInvite services", error)
            return { error: true, message: "Error! Please again." }
        }
    }
}

export default InviteService
