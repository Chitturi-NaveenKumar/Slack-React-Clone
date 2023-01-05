import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { connect, Provider } from "react-redux";
import {
  HashRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import { createStore } from "redux";
import App from "./App";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import firebase from "./server/firebase";
import { setUser } from "./store/actioncreator";
import { combinedReducers } from "./store/reducer";

import "semantic-ui-css/semantic.min.css";

const store = createStore(combinedReducers);

const Index = (props) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.setUser(user);
        props.history.push("/");
      } else {
        props.setUser(null);
        props.history.push("/login");
      }
    });
  }, []);

  console.log("Debug", props.currentUser);

  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={App} />
      </Switch>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    loading: state.channel.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => {
      dispatch(setUser(user));
    },
  };
};

const IndexWithRouter = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Index)
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename="/Slack-React-Clone">
        <IndexWithRouter />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
