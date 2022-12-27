import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "semantic-ui-css/semantic.min.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/">
        <Redirect to="/register" />
      </Route>
    </Switch>
  </Router>
);
