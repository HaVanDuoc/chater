import { IChat } from "./chat.interface"
import { IUser } from "./user.interface"

export type StatusInvite = "waiting" | "accept" | "reject" | "redeem"

export interface IInvite {
    _id: any
    sender: IUser
    receiver: IUser["_id"]
    chatId?: IChat["_id"]
    status?: StatusInvite
}
