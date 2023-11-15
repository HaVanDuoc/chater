import { model, Schema, SchemaDefinitionProperty } from "mongoose"
import Role from "./Role"
import StatusAccount from "./StatusAccount"

export interface IUser {
    email: string
    email_verified: boolean
    family_name: string
    given_name: string
    name: string
    picture: string
    role?: SchemaDefinitionProperty
    status?: SchemaDefinitionProperty
}

async function getDefaultRole() {
    const role = await Role.findOne({ name: "User" }).select("_id").exec()
    console.log("role?._id", role?._id)
    return role?._id
}

async function getDefaultStatus() {
    const status = await StatusAccount.findOne({ name: "Offline" }).select("_id").exec()
    console.log("status", status?._id)
    return status?._id
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
    },
    { timestamps: true },
)

const User = model<IUser>("User", userSchema)

export default User
