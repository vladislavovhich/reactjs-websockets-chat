import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

interface WebSocketProviderProps {
  children: ReactNode;
}

const url = process.env.REACT_APP_WS_URL || ""
const WebSocketContext = createContext<any>(null);

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const [messageHistory, setMessageHistory] = useState<MessageEvent[]>([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(url, {
    onOpen: () => console.log('Соединение установлено'),
    shouldReconnect: (closeEvent) => true, 
  });

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => [...prev, lastMessage]);
    }
  }, [lastMessage]);

  return (
    <WebSocketContext.Provider value={{ sendMessage, messageHistory, readyState, lastMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => {
  return useContext(WebSocketContext);
};
