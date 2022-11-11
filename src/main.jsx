import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DebountyProvider } from "./context/DeBountyContext";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DebountyProvider>
      <ToastContainer
        position="top-right"
        hideProgressBar={true}
        autoClose={5000}
        closeButton={false}
        closeOnClick={true}
        newestOnTop={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <App />
    </DebountyProvider>
  </React.StrictMode>
);
