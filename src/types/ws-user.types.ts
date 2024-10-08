import { Room } from "./room.types"

export interface WsResponse {
    action: string
}

export interface WsClientGetId extends WsResponse {
    id: string
    clients: number
    rooms: Room[]
}

export interface WsClientConnected extends WsResponse {
    clients: number
}

export interface WsClientDisconnected extends WsResponse {
    clients: number
    rooms: Room[]
}