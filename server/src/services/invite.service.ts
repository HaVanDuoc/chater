import { Schema } from "mongoose"
import Invite from "../models/Invite"
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
        chatId?: Schema.Types.ObjectId,
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
            if (!chatId) {
                // check friends
                const check = await checkFriend()
                if (check) return { error: true, message: "Cả hai đã là bạn!" }

                // Đầu tiên tìm và cập nhật nếu không có thì tạo một lời mời
                const findOneAndUpdate = await Invite.findOne({
                    $and: [{ sender: sender }, { receiver: receiver }],
                })

                if (!findOneAndUpdate) {
                    const newInvite = await Invite.create({ sender, receiver })
                    return { message: "Đã gửi yêu cầu kết bạn!", data: newInvite }
                }

                return { message: "Đã gửi yêu cầu kết bạn!", data: findOneAndUpdate }
            } else {
                const findOneAndUpdate = await Invite.findOne({
                    $and: [{ sender: sender }, { receiver: receiver }, { chatId: chatId }],
                })

                if (!findOneAndUpdate) {
                    const newInvite = await Invite.create({ sender, receiver, chatId })
                    return { message: "Đã gửi lời mời nhóm!", data: newInvite }
                }

                return { message: "Đã gửi lời mời nhóm!", data: findOneAndUpdate }
            }
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

                // create chatbox
                const members = [sender, receiver]
                const createChat: any = await Chat.create({ members })

                if (
                    addReceiverToSenderListFriends &&
                    addSenderToReceiverListFriends &&
                    createChat
                ) {
                    // Delete invite
                    const deleteInvite = await Invite.findByIdAndDelete(invite_id)
                    if (deleteInvite) {
                        return {
                            message: "Đã đồng ý kết bạn!",
                            data: { invite: deleteInvite, chat: createChat },
                        }
                    }
                }

                return { error: true, message: "Error! Please again." }
            } else {
                const addGroup = await Chat.findByIdAndUpdate(chatId, {
                    $push: { members: current_user_id },
                })

                if (addGroup) return { message: "Bạn đã tham gia nhóm chat!", data: addGroup }
            }
        } catch (error) {
            console.log("ERROR accept invite", error)
            return { error: true, message: "Error! Please again." }
        }
    }

    export const rejectInvite = async (invite_id: Schema.Types.ObjectId) => {
        try {
            const reject = await Invite.findByIdAndDelete(invite_id)
            if (reject) {
                return { message: "Đã từ chối kết bạn!", data: reject }
            }
        } catch (error) {
            console.log("ERROR rejectInvite services", error)
            return { error: true, message: "Error! Please again." }
        }
    }

    export const redeemInvite = async (invite_id: Schema.Types.ObjectId) => {
        try {
            const redeem = await Invite.findOneAndDelete(invite_id)
            if (redeem) {
                return { message: "Đã thu hồi lời mời", data: redeem }
            }
        } catch (error) {
            console.log("ERROR redeemInvite services", error)
            return { error: true, message: "Error! Please again." }
        }
    }
}

export default InviteService
