import { model, Schema } from "mongoose"

export interface IUser {
    _id?: Schema.Types.ObjectId
    email: string
    email_verified: boolean
    displayName: string
    familyName: string
    givenName: string
    picture: string
    accessToken: string
    friends: Schema.Types.ObjectId[]
    invite?: any
    // isFriend?: boolean
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
        displayName: {
            type: String,
        },
        familyName: {
            type: String,
        },
        givenName: {
            type: String,
        },
        picture: {
            type: String,
        },
        accessToken: {
            type: String,
        },
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        invite: {
            type: Schema.Types.Mixed,
            default: {},
        },
        // isFriend: {
        //     type: Schema.Types.Boolean,
        //     default: false,
        // },
    },
    { timestamps: true },
)

const User = model<IUser>("User", userSchema)

export default User
