import Invite from "../models/Invite"

namespace InviteService {
    export const getInvite = async (current_user_id: string) => {
        try {
            const invites = await Invite.find({
                sender: current_user_id,
                $and: [{ status: "waiting" }],
            })
                .populate("sender")
                .populate("receiver")
                .exec()
            return { message: "Get data succeeded", invites }
        } catch (error) {
            console.log("error - invite.services.ts", error)
            return error
        }
    }
}

export default InviteService
