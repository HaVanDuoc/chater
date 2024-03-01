export type StatusInvite = "waiting" | "accept" | "reject" | "redeem"

export interface IInvite {
    _id: string
    sender: string
    receiver: string
    chatId?: string
    status?: StatusInvite
}
