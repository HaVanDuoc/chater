import { model, Schema } from "mongoose"

export interface IStatusAccount {
    name: string
}

const statusAccountSchema = new Schema<IStatusAccount>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true },
)

const StatusAccount = model<IStatusAccount>("StatusAccount", statusAccountSchema)

export default StatusAccount
