import React from "react";
import "../../styles/message.css"

interface Props {
    clientId: string
    text: string
    time: string
    index: number
}

export const Message = (props: Props) => {
    const {clientId, text, time, index} = props
    const date = new Date(parseInt(time))

    return (
        <div className={`Message d-flex flex-column ${index != 0 && "mt-3"}`}>
            <div>ID: {clientId}</div>

            <div className="text-info">
                {text}
            </div>

            <div>{date.toUTCString()}</div>
        </div>
    )
}