import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReadyState } from "react-use-websocket";
import config from "../../config";
import { AWSAuth } from "../auth/AWSAuth";
import { useWebsocketContext } from "../context/WebsocketContext";
import { InboundMessage } from "../types/WebsocketTypes";

const { WEBSOCKET_URL } = config.apiGateway;

const waitForMessage = (action: InboundMessage.Any["action"]) => {};

const useRetroClient = () => {
  const { retroID } = useParams<{ retroID: string }>();
  const { ws, sendMessage, setWebsocketUrl } = useWebsocketContext();
  const [status, setStatus] = useState("Initialising");

  const connect = async () => {
    if (ws.readyState !== ReadyState.OPEN) {
      const websocket = ws.getWebSocket();
      if (websocket) websocket.close();
    }

    setStatus("Connecting");
    const signedUrl = await AWSAuth.getSignedUrl(WEBSOCKET_URL);
    setWebsocketUrl(signedUrl);
  };

  const loadInitialData = async () => {
    const websocket = ws.getWebSocket();
    if (!websocket || !retroID) return;

    const _onSubsequentMessage: EventListener = (message) => {
      console.log(message);
      websocket.removeEventListener("message", _onSubsequentMessage);
    };

    websocket.addEventListener("message", _onSubsequentMessage);
    sendMessage({ action: "SyncRetroData", data: { retroID } });
  };

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    if (ws.readyState === ReadyState.OPEN) {
      loadInitialData();
    }
  }, [ws.readyState]);

  return { status };
};

export default useRetroClient;
