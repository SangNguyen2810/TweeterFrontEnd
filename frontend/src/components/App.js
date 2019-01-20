import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import LoginPage from "../containers/Login"
import RegisterPage from "../containers/Register";
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import DashboardPage from "../containers/Dashboard";
import PrivateRoute from '../components/PrivateRoute';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/login" component={LoginPage} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={DashboardPage} />
            </Switch>
          </Switch>
          <Footer />
        </div>
      </Router >
    );
  }
}
export default App;