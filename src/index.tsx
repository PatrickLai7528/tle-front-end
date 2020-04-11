import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReactReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./i18n";
import "./index.scss";
import { Routes } from "./routes";
import * as serviceWorker from "./serviceWorker";
import { store } from "./store";
import { ConnectedNotificatioQueue } from "./components/notification-queue";
ReactDOM.render(
  <ReactReduxProvider store={store}>
    <Router>
      <ConnectedNotificatioQueue />
      <Routes />
    </Router>
  </ReactReduxProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
