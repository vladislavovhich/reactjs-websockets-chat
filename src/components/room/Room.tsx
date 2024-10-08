import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Message } from "./Message";
import { useWebSocketContext } from "../WebSocketsContext";
import { WsResponse } from "../../types/ws-user.types";
import { WsRoomMessage, WsRoomUpdatedResponse } from "../../types/ws-room.types";
import { addClient, addMessage, removeClient, setMessageText, setRooms } from "../../store/reducers/room.slice";
import { useNavigate } from "react-router-dom";

export const Room = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const {lastMessage, sendMessage} = useWebSocketContext()
    const {currentRoom, message} = useSelector((state: RootState) => state.room)
    const {userId} = useSelector((state: RootState) => state.user)

    useEffect(() => {
        if (!lastMessage) {
            return
        }

        const messageData = JSON.parse(lastMessage.data) as WsResponse

        if (messageData.action == "room/send-message") {
            const data = messageData as WsRoomMessage

            if (data.message.isJoined != undefined && data.message.isJoined == 1) {
                dispatch(addClient())
            } else if (data.message.isJoined != undefined && data.message.isJoined == 0) {
                dispatch(removeClient())
            }

            dispatch(addMessage(data.message))
        } else if (messageData.action == "room/leave") {
            const data = messageData as WsRoomUpdatedResponse

            dispatch(setRooms(data.rooms))

            if (data.clientId == userId) {
                return navigate("/")
            }
        }
    }, [lastMessage])

    if (!currentRoom) {
        return null
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setMessageText(e.target.value))
    }

    const handleSend = (e: React.MouseEvent<HTMLElement>) => {
        const msg = {
            action: "room/send-message",
            message,
            clientId: userId,
            roomId: currentRoom.id
        }

        dispatch(setMessageText(""))
        sendMessage(JSON.stringify(msg))
    }

    const handleLeave = (e: React.MouseEvent<HTMLElement>) => {
        const message = {
            action: "room/leave",
            roomId: currentRoom.id,
            clientId: userId
        }

        sendMessage(JSON.stringify(message))
    }

    const {id, clients} = currentRoom
    
    return (
        <div>
            <hr className="text-white"/>

            <div className="d-flex flex-row justify-content-between align-items-center">
                <div className="d-flex flex-row">
                    <div className='text-info'>
                        Комната: {id}
                    </div>
                    <div className='ms-3 d-flex flex-row align-items-center text-info'>
                        <FontAwesomeIcon icon={faUserGroup} />
                        <div className='ms-2'>{clients.length}</div>
                        <div className="spinner-grow spinner-grow-sm text-success ms-2" role="status" />
                    </div>
                </div>
                <div className='ms-3'>
                    <input 
                        type='button' 
                        value="Выйти" 
                        className='btn btn-info' 
                        onClick={handleLeave}
                    />
                </div>
            </div>

            <hr className="text-white"/>

            <div className="d-flex flex-row">
                <input 
                    type="text" 
                    className="form-control" 
                    data-bs-theme="dark" 
                    value={message} 
                    onChange={handleOnChange}
                />

                <input 
                    type="button" 
                    className="btn btn-info ms-3" 
                    value="Отправить"
                    onClick={handleSend}
                />
            </div>

            <hr className="text-white"/>

            <div className="text text-info">
                {
                    currentRoom.messages.map((message, index) => (
                        <Message 
                            text={message.text}
                            clientId={message.clientId}
                            time={message.time}
                            index={index}
                            key={index}
                        />
                    ))
                }
            </div>
        </div>
    )
}

