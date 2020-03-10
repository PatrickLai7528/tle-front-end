import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import { Provider as ReactReduxProvider } from "react-redux";
import { Routes } from "./routes";
import { store } from "./store";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <ReactReduxProvider store={store}>
    <Router>
      <Routes />
    </Router>
  </ReactReduxProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
