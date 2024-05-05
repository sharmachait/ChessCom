import { useEffect, useState } from 'react';

const WS_URL = 'ws://localhost:8080';

const useSocket = (): WebSocket => {
  const [socket, setSocket] = useState<WebSocket>(null as unknown as WebSocket);
  try {
    useEffect(() => {
      const ws = new WebSocket(WS_URL);
      ws.onopen = () => {
        console.log('connected');
        setSocket(ws);
      };
      ws.onclose = () => {
        console.log('disconnected');
        setSocket(null as unknown as WebSocket);
      };
      return () => {
        ws.close();
      };
    }, []);
  } catch (e) {
    console.log(e);
  }
  return socket;
};

export default useSocket;
