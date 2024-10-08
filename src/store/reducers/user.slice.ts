import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface State {
    userId: string
    totalUsers: number
}

const state: State = {
    userId: "",
    totalUsers: 0
}

export const user = createSlice({
    name: 'user',
    initialState: state,
    reducers: {
        setUserId(state, action: PayloadAction<string>) {
            state.userId = action.payload
        },
        setClients(state, action: PayloadAction<number>) {
            state.totalUsers = action.payload
        }
    }
})

export const {setUserId, setClients} = user.actions