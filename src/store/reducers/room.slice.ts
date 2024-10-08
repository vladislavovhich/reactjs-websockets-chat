import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message, Room } from "../../types/room.types";

interface State {
    rooms: Room[]
    currentRoom: Room | null
    message: string
}

const state: State = {
    rooms: [],
    currentRoom: null,
    message: ""
}

export const room = createSlice({
    name: 'user',
    initialState: state,
    reducers: {
        addRoom(state, action: PayloadAction<Room>) {
            state.rooms = [...state.rooms, action.payload]
        },
        setRooms(state, action: PayloadAction<Room[]>) {
            state.rooms = action.payload
        },
        setCurrentRoom(state, action: PayloadAction<Room>) {
            state.currentRoom = action.payload
        },
        addMessage(state, action: PayloadAction<Message>) {
            if (!state.currentRoom) {
                return
            }

            state.currentRoom.messages.push(action.payload)
        },
        addClient(state, action: PayloadAction) {
            state.currentRoom?.clients.push("1")
        },
        removeClient(state, action: PayloadAction) {
            if (!state.currentRoom) {
                return
            }

            state.currentRoom.clients = state.currentRoom.clients.slice(1)
        },
        setMessageText(state, action: PayloadAction<string>) {
            state.message = action.payload
        }
    }
})

export const {addRoom, setRooms, setCurrentRoom, addMessage, addClient, removeClient, setMessageText} = room.actions