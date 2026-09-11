import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <ChatContextProvider>
        <App />
      </ChatContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
