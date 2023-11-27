import { model, Schema, SchemaDefinitionProperty } from "mongoose"
import Role from "./Role"
import StatusAccount from "./StatusAccount"

export interface IUser {
    _id?: Schema.Types.ObjectId
    email: string
    email_verified: boolean
    family_name: string
    given_name: string
    name: string
    picture: string
    token: string
    invites: any
    role: Schema.Types.ObjectId
    status: Schema.Types.ObjectId
    friends: Schema.Types.ObjectId[]
    chats: Schema.Types.ObjectId[]
    chat?: any
}

const userSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        email_verified: {
            type: Boolean,
            default: false,
        },
        family_name: {
            type: String,
        },
        given_name: {
            type: String,
        },
        name: {
            type: String,
        },
        picture: {
            type: String,
        },
        token: {
            type: String,
        },
        role: {
            type: Schema.Types.ObjectId,
            ref: "Role",
            default: "65534ed419c0d3e23369a3e2",
        },
        status: {
            type: Schema.Types.ObjectId,
            ref: "StatusAccount",
            default: "65535165d0f88eb84834c824",
        },
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        chats: [
            {
                type: Schema.Types.ObjectId,
                ref: "Chat",
            },
        ],
    },
    { timestamps: true },
)

const User = model<IUser>("User", userSchema)

export default User
