export type Room = {
    id: string
    messages: Message[]
    clients: string[]
}

export type Message = {
    clientId: string
    text: string
    time: string
    isJoined?: number
}
