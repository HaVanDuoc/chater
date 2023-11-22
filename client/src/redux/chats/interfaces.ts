export type TypeChat = "default" | "group"

export interface IChat {
    _id: string
    name: string
    avatar: string
    members: any[]
    type: TypeChat
    content: any[]
}
