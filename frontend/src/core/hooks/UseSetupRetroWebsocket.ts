import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReadyState } from "react-use-websocket";
import config from "../../config";
import { AWSAuth } from "../auth/AWSAuth";
import { useWebsocketContext } from "../context/WebsocketContext";
import { InboundMessage, OutboundMessage } from "../types/WebsocketTypes";

const { WEBSOCKET_URL } = config.apiGateway;

type IRetro = {
  id: string;
  name: string;
  type: string;
};

const useSetupRetroWebsocket = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { ws, status, sendMessage, setWebsocketUrl } = useWebsocketContext();

  const connect = async () => {
    if (ws.readyState !== ReadyState.OPEN) {
      const websocket = ws.getWebSocket();
      if (websocket) websocket.close();
    }

    const signedUrl = await AWSAuth.getSignedUrl(WEBSOCKET_URL);
    setWebsocketUrl(signedUrl);
  };

  const handleMessage = useCallback((message: InboundMessage.Any) => {
    switch (message.action) {
      case "SUCCESS:CREATED_RETRO":
        setIsLoading(false);
        navigate(`/app/retros/${message.retro.id}`);
        return;
    }
  }, []);

  const setupRetro = (data: OutboundMessage.SetupRetro["data"]) => {
    setIsLoading(true);
    sendMessage({ action: "SetupRetro", data });
  };

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    if (ws.lastJsonMessage === null) return;
    if (!ws.lastJsonMessage.action) return;
    handleMessage(ws.lastJsonMessage);
  }, [ws.lastJsonMessage, handleMessage]);

  return {
    ws,
    isLoading,
    setupRetro,
    status,
  };
};

export default useSetupRetroWebsocket;
