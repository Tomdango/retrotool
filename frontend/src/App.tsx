import React from "react";
import { AuthProvider } from "./core/context/AuthContext";
import { WebsocketProvider } from "./core/context/WebsocketContext";
import Router from "./presentation/functional/Router";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <WebsocketProvider>
        <Router />
      </WebsocketProvider>
    </AuthProvider>
  );
};

export default App;
