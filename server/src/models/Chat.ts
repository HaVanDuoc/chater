import { model, Schema } from "mongoose"

export type TypeChat = "default" | "group"

export interface IChat {
    _id?: Schema.Types.ObjectId
    name?: string
    members: Schema.Types.ObjectId[]
    type?: TypeChat
}

const chatSchema = new Schema<IChat>(
    {
        name: {
            type: String,
        },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        type: {
            type: String,
            default: "default",
        },
    },
    { timestamps: true },
)

const Chat = model<IChat>("Chat", chatSchema)

export default Chat
