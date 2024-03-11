import { model, Schema } from "mongoose"

export interface IChat {
    _id?: Schema.Types.ObjectId
    name?: string
    avatar?: string
    members: Schema.Types.ObjectId[]
    messages: Schema.Types.ObjectId[]
    group?: boolean
}

const chatSchema = new Schema<IChat>(
    {
        name: {
            type: String,
        },
        avatar: {
            type: String,
        },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        messages: [
            {
                type: Schema.Types.ObjectId,
                ref: "Message",
            },
        ],
        group: {
            type: Boolean,
        },
    },
    { timestamps: true },
)

const Chat = model<IChat>("Chat", chatSchema)

export default Chat
