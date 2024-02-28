export type StatusInvite = "waiting" | "accept" | "reject"

export interface IInvite {
    _id: string
    sender: string
    receiver: string
    chatId?: string
    status?: StatusInvite
}
