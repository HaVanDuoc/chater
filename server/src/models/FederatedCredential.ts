import { model, Schema } from "mongoose"

export interface IFederatedCredential {
    user_id: Schema.Types.ObjectId
    provider: string
    subject: string
}

const federatedCredentialSchema = new Schema<IFederatedCredential>(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        provider: {
            type: Schema.Types.String,
        },
        subject: {
            type: Schema.Types.String,
            unique: true,
        },
    },
    { timestamps: true },
)

const FederatedCredential = model<IFederatedCredential>(
    "FederatedCredential",
    federatedCredentialSchema,
)

export default FederatedCredential
