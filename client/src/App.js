import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import Confirm from './components/auth/Confirm';
// import Spinner from './components/auth/Spinner'
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
// import Userform from "./components/auth/Confirmation"
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import UserNavbar from "./components/dashboard/UserNavbar";

import Assessment from "./components/assessment/Assessment";


import "./App.css";
// import MainForm from "./components/auth/MainForm";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App" styles={{"background-image": "linear-gradient( rgba(255, 255, 255, 1), rgba(220,237,255, 1))"}}
> 
            {/* <Navbar /> */}
            <Route exact path="/" component={Landing} />
            {/* <Route exact path="/register" component={MainForm} /> */}
            <Route exact path="/register" component={Register} />
            {/* <Route exact path='/confirm/:id' component={Confirm} /> */}
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              {/* <PrivateRoute exact path="/dashboard" component={UserNavbar} /> */}
              <PrivateRoute exact path="/assessment" component={Assessment} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
