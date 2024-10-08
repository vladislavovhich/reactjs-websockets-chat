import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import image from "../../images/no_rooms.jpg"
import { useWebSocketContext } from '../WebSocketsContext';
import { WsResponse } from '../../types/ws-user.types';
import { WsRoomCreated, WsRoomJoined } from '../../types/ws-room.types';
import { setCurrentRoom, setRooms } from '../../store/reducers/room.slice';
import { RoomItem } from './RoomItem';
import { redirect, useNavigate } from 'react-router-dom';

export const Rooms = () => {
    const navigate = useNavigate()
    const {userId} = useSelector((state: RootState) => state.user)
    const { sendMessage, lastMessage } = useWebSocketContext()
    const dispatch = useDispatch<AppDispatch>()

    const {rooms, currentRoom} = useSelector((state: RootState) => state.room)

    const handleCreateRoom = (e: React.MouseEvent<HTMLElement>) => {
        const message = {
            action: "room/create",
            clientId: userId
        }

        sendMessage(JSON.stringify(message))
    }

    useEffect(() => {
        if (!lastMessage) {
            return
        }

        const messageData = JSON.parse(lastMessage.data) as WsResponse
        
        if (messageData.action == "room/created") {
            const data = messageData as WsRoomCreated

            dispatch(setCurrentRoom(data.createdRoom))
            dispatch(setRooms(data.rooms))

            return navigate(`/room/current`)
        } else if (messageData.action == "room/join") {
            const data = messageData as WsRoomJoined

            dispatch(setCurrentRoom(data.room))

            return navigate(`/room/current`)
        }
    }, [lastMessage])

    return (
        <div>
            {rooms.length ? (
                <>
                    <p className='text text-info fw-bold'>Список комнат:</p>

                    {
                        rooms.map((room, index) => (
                            <RoomItem index={index} id={room.id} clients={room.clients} key={index} />
                        ))
                    }

                    <input 
                        type='button' 
                        value="Создать комнату" 
                        className='btn btn-info mt-3' 
                        onClick={handleCreateRoom}
                    />
                </>
            ) : (
                <div className='d-flex justify-content-center'>
                    <img src={image} className='no-rooms-img'/>

                    <div className='d-flex flex-column justify-content-center ms-3 ali'>
                        <div className='text text-info fw-bold mb-3'>К сожалению, комнат нет, <br />но вы можете создать новую...</div>
                        <input 
                            type='button' 
                            value="Создать комнату" 
                            className='btn btn-info' 
                            onClick={handleCreateRoom}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}