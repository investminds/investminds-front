import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./config/translator.js";
import { Provider } from "react-redux";
import store from "./store/index.js";
import { FacebookProvider } from "react-facebook";
import { AuthProvider } from "./context/auth-context.jsx";
const APP_ID = import.meta.env.VITE_FACEBOOK_APP_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FacebookProvider appId={APP_ID} version="v20.0">
      <Provider store={store}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Provider>
    </FacebookProvider>
  </React.StrictMode>
);
