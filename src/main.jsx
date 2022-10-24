import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DebountyProvider } from "./context/DeBountyContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DebountyProvider>
      <App />
    </DebountyProvider>
  </React.StrictMode>
);
