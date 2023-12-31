import { model, Schema } from "mongoose"

export interface IUser {
    _id?: Schema.Types.ObjectId
    email: string
    email_verified: boolean
    displayName: string
    familyName: string
    givenName: string
    name: string
    picture: string
    token: string
    hashed_password: string
    salt: string
    invites: any
    friends: Schema.Types.ObjectId[]
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
        name: {
            type: String,
        },
        picture: {
            type: String,
        },
        token: {
            type: String,
        },
        hashed_password: {
            type: String,
        },
        salt: {
            type: String,
        },
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true },
)

const User = model<IUser>("User", userSchema)

export default User
