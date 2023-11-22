import { model, Schema } from "mongoose"

export interface IMessage {
    content: string
    auth: Schema.Types.ObjectId
    reply: Schema.Types.ObjectId
    ofChat: Schema.Types.ObjectId
}

const messageSchema = new Schema<IMessage>(
    {
        content: {
            type: String,
        },
        auth: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        reply: {
            type: Schema.Types.ObjectId,
            ref: "Message",
        },
        ofChat: {
            type: Schema.Types.ObjectId,
            ref: "Chat",
        },
    },
    { timestamps: true },
)

const Message = model<IMessage>("Message", messageSchema)

export default Message
