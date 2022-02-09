import React, { useState } from "react";
import useRetroClient from "../../../core/hooks/UseRetroClient";
import Card from "../../components/Card";
import AppWrapper from "../../wrappers/AppWrapper";

const useRetroView = () => {
  const { status } = useRetroClient();

  const [retro] = useState<any>();
  //   const { retroID } = useParams<{ retroID: string }>();

  //   const loadRetroData = () => {
  //     ws.sendJsonMessage({ action: "SyncRetroData", retroID });
  //   };

  //   const subscribeToRetro = () => {
  //     ws.sendJsonMessage({ action: "AddSubscription", retroID });
  //   };

  //   useEffect(() => {
  //     if (!ws.lastJsonMessage) return;
  //     switch (ws.lastJsonMessage.action) {
  //       case "SUCCESS::SYNC_RETRO_DATA":
  //         setRetro(ws.lastJsonMessage.retro);
  //         if (!isSubscribed) {
  //           subscribeToRetro();
  //         }
  //     }
  //   }, [ws.lastJsonMessage]);

  //   useEffect(() => {
  //     if (ws.readyState === ReadyState.OPEN) {
  //       loadRetroData();
  //     }
  //   }, [ws.readyState]);

  return {
    status,
    retro,
  };
};

const RetroView: React.FC = () => {
  const { status, retro } = useRetroView();

  return (
    <AppWrapper>
      <Card>
        <p>Status: {status}</p>
        <p>Retro: {JSON.stringify(retro)}</p>
      </Card>
    </AppWrapper>
  );
};

export default RetroView;
