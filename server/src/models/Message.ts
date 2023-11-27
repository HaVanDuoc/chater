import { model, Schema } from "mongoose"

export interface IMessage {
    chat: Schema.Types.ObjectId
    sender: Schema.Types.ObjectId
    content: string
    reply?: Schema.Types.ObjectId
}

const messageSchema = new Schema<IMessage>(
    {
        content: {
            type: String,
        },
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        reply: {
            type: Schema.Types.ObjectId,
            ref: "Message",
        },
        chat: {
            type: Schema.Types.ObjectId,
            ref: "Chat",
        },
    },
    { timestamps: true },
)

const Message = model<IMessage>("Message", messageSchema)

export default Message
