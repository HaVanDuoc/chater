import { model, Schema } from "mongoose"

type StatusInvite = "waiting" | "accept" | "reject"

type TypeInvite = "FRIEND REQUEST" | "JOIN GROUP"

export interface IInvite {
    type: TypeInvite
    sender: Schema.Types.ObjectId
    receiver: Schema.Types.ObjectId
    status?: StatusInvite
    chatId?: Schema.Types.ObjectId
}

const inviteSchema = new Schema<IInvite>(
    {
        sender: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        receiver: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        status: {
            type: String,
            default: "waiting",
        },
        chatId: {
            type: Schema.Types.ObjectId,
        },
    },
    { timestamps: true },
)

const Invite = model<IInvite>("Invite", inviteSchema)

export default Invite
