import App from "./App.jsx";
import store from "./store/index.js";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { FacebookProvider } from "react-facebook";
import "./index.css";
import "./config/translator.js";
import "react-toastify/dist/ReactToastify.css";

const APP_ID = import.meta.env.VITE_FACEBOOK_APP_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FacebookProvider appId={APP_ID} version="v20.0">
      <Provider store={store}>
        <App />
        <ToastContainer />
      </Provider>
    </FacebookProvider>
  </React.StrictMode>
);
