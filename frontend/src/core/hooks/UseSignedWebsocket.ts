import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import config from "../../config";
import { AWSAuth } from "../auth/AWSAuth";

const useSignedWebsocket = () => {
  const [signedUrl, setSignedUrl] = useState<string>("");
  const websocket = useWebSocket(signedUrl);

  const setWebsocketUrl = async () => {
    const url = await AWSAuth.getSignedUrl(config.apiGateway.WEBSOCKET_URL);
    setSignedUrl(url);
  };

  useEffect(() => {
    setWebsocketUrl();
  }, []);

  return websocket;
};

export default useSignedWebsocket;
