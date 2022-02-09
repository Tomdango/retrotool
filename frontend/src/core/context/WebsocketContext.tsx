import { createContext, useContext, useState } from "react";
import useWebsocket, { ReadyState } from "react-use-websocket";
import type { WebSocketHook } from "react-use-websocket/dist/lib/types";
import { InboundMessage, OutboundMessage } from "../types/WebsocketTypes";

type IWebsocketContext = {
  ws: WebSocketHook;
  status: string;
  websocketUrl: string | null;
  setWebsocketUrl: (websocketUrl: string) => void;
  sendMessage: (message: OutboundMessage.Any) => void;
};

const WebsocketContext = createContext<IWebsocketContext>({
  ws: {
    getWebSocket: () => null,
    lastJsonMessage: null,
    lastMessage: null,
    readyState: ReadyState.UNINSTANTIATED,
    sendJsonMessage: () => {},
    sendMessage: () => {},
  },
  status: "Starting",
  websocketUrl: null,
  setWebsocketUrl: () => {},
  sendMessage: () => {},
});

const ValidResponses: Record<
  OutboundMessage.Any["action"],
  Array<InboundMessage.Any["action"]>
> = {
  SetupRetro: ["SUCCESS:CREATED_RETRO"],
  SyncRetroData: ["SUCCESS::SYNC_RETRO_DATA"],
};

export const WebsocketProvider: React.FC = ({ children }) => {
  const [websocketUrl, setWebsocketUrl] = useState<string | null>(null);
  const ws = useWebsocket(websocketUrl);

  const sendMessage = (message: OutboundMessage.Any) => {
    return new Promise<InboundMessage.Any>((resolve, reject) => {
      const controller = new AbortController();

      const websocket = ws.getWebSocket();
      if (!websocket) {
        reject(new Error("Websocket Unavailable"));
        return;
      }

      let isComplete = false;

      const messageTimeout = setTimeout(() => {
        console.log("Message Timed Out");
        controller.abort();
      }, 5000);

      const _messageListener: EventListener = (event) => {
        console.log(event);

        clearTimeout(messageTimeout);
      };

      websocket.addEventListener("message", _messageListener);

      controller.signal.addEventListener("abort", () => {
        websocket.removeEventListener("message", _messageListener);
      });

      ws.sendJsonMessage(message);
    });
  };

  const status = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Connected",
    [ReadyState.CLOSING]: "Disconnecting",
    [ReadyState.CLOSED]: "Disconnected",
    [ReadyState.UNINSTANTIATED]: "Starting",
  }[ws.readyState];

  return (
    <WebsocketContext.Provider
      value={{
        ws,
        status,
        websocketUrl,
        setWebsocketUrl,
        sendMessage,
      }}
    >
      {children}
    </WebsocketContext.Provider>
  );
};

export const useWebsocketContext = () => useContext(WebsocketContext);

export default WebsocketContext;
