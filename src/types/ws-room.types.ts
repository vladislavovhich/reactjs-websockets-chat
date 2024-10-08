import { Message, Room } from "./room.types";
import { WsResponse } from "./ws-user.types";

export interface WsRoomUpdatedResponse extends WsResponse {
    rooms: Room[]
    clientId: string
}

export interface WsRoomCreated extends WsResponse {
    rooms: Room[]
    createdRoom: Room
}

export interface WsRoomMessage extends WsResponse {
    message: Message
}

export interface WsRoomJoined extends WsResponse {
    room: Room
}