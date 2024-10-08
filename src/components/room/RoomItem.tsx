import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useWebSocketContext } from '../WebSocketsContext';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface Props {
    index: number
    id: string
    clients: string[]
}

export const RoomItem = (props: Props) => {
    const { userId } = useSelector((state: RootState) => state.user)
    const { sendMessage } = useWebSocketContext()

    const {id, clients, index} = props

    const handleJoinRoom = (e: React.MouseEvent<HTMLElement>) => {
        const message = {
            action: "room/join",
            roomId: id,
            clientId: userId
        }

        sendMessage(JSON.stringify(message))
    }

    return (
        <div className={`Room d-flex flex-row align-items-center ${index != 0 && "mt-3"}`}>
            <div className='text-info'>
                ID: {id}
            </div>
            <div className='ms-3 d-flex flex-row align-items-center text-info'>
                <FontAwesomeIcon icon={faUserGroup} />
                <div className='ms-2'>{clients.length}</div>
                <div className="spinner-grow spinner-grow-sm text-success ms-2" role="status" />
            </div>
            <div className='ms-3'>
                <input 
                    type='button' 
                    value="Войти" 
                    className='btn btn-info' 
                    onClick={handleJoinRoom}
                />
            </div>
        </div>
    )
}