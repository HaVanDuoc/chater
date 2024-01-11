export interface IUser {
    _id: string
    email: string
    email_verified: boolean
    family_name: string
    given_name: string
    name: string
    picture: string
    token: string
    role: any
    status: any
    friends: any
    chats: any
    invites: any[]
    createdAt: string
    updatedAt: string
}

export type StatusInvite = "waiting" | "accept" | "reject"

export type TypeInvite = "FRIEND REQUEST" | "JOIN GROUP"

export interface IInvite {
    type: TypeInvite
    sender: string
    receiver: string
    status?: StatusInvite
}
