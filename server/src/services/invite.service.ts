import { Schema } from "mongoose"
import Invite from "../models/Invite"
import User from "../models/User"
import Chat from "../models/Chat"

namespace InviteService {
    export const getListInvites = async (auth_id: string) => {
        try {
            const invites = await Invite.find({
                receiver: auth_id,
                $and: [{ status: "waiting" }],
            })
                .populate("sender")
                .exec()
            return { message: "Get list invites success", invites }
        } catch (error) {
            console.log("error - invite.services.ts", error)
            return error
        }
    }

    export const acceptInvite = async (invite_id: Schema.Types.ObjectId) => {
        try {
            const invite = await Invite.findById(invite_id)

            if (invite) {
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

                // update invite
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
