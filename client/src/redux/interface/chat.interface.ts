import { IUser } from "./user.interface"

export interface IMessage {
    _id: any
    chat: IChat["_id"]
    sender: IUser
    content: string
    reply?: string
}
export interface IChat {
    _id: any
    name: string
    avatar: string
    members: any[]
    content: any[]
    messages?: IMessage[]
}
