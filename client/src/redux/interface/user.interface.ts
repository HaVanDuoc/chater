export interface IUser {
    _id: string
    email: string
    email_verified: boolean
    familyName?: string
    givenName?: string
    name: string
    displayName?: string
    picture: string
    status: any
    friends: any[]
    chats: any[]
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
