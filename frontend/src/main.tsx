import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import "./index.css";

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
);
