import { configureStore } from "@reduxjs/toolkit";
import { user } from "./reducers/user.slice";
import { room } from "./reducers/room.slice";

const store = configureStore({
    reducer: {
        user: user.reducer,
        room: room.reducer
    },
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export default store