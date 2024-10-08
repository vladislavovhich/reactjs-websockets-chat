import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useWebSocketContext } from './WebSocketsContext';
import { WsClientConnected, WsClientDisconnected, WsClientGetId, WsResponse } from '../types/ws-user.types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { setClients, setUserId } from '../store/reducers/user.slice';
import "../styles/common.css"
import { setRooms } from '../store/reducers/room.slice';
import { WsRoomUpdatedResponse } from '../types/ws-room.types';

export const App = () => {
    const { lastMessage} = useWebSocketContext()

    const { userId, totalUsers } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (!lastMessage) {
            return
        }

        const messageData = JSON.parse(lastMessage.data) as WsResponse

        if (messageData.action == "client/get-id") {
            const data = messageData as WsClientGetId

            dispatch(setUserId(data.id))
            dispatch(setRooms(data.rooms))
        } else if (messageData.action == "client/connected") {
            const data = messageData as WsClientConnected

            dispatch(setClients(data.clients))
        } else if (messageData.action == "client/disconnected") {
            const data = messageData as WsClientDisconnected

            dispatch(setClients(data.clients))
            dispatch(setRooms(data.rooms))
        } else if (messageData.action == "room/updated") {
            const data = messageData as WsRoomUpdatedResponse

            dispatch(setRooms(data.rooms))
        }

    }, [lastMessage])

    return (
        <div className='App bg-darker'>
            <header className='Header bg-dark'>
                <div className='container d-flex justify-content-between align-items-center h-100'>
                    <div className='text text-info'>Ваш ID: {userId}</div>
                    <div className='d-flex flex-row align-items-center'>
                        <div className='text text-info'>Пользователей онлайн: {totalUsers}</div>
                        <div className="spinner-grow spinner-grow-sm text-success ms-2" role="status" />
                    </div>
                </div>
            </header>

            <main className='my-3'>
                <div className='container'>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}