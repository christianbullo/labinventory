import React, { Component } from "react";
import Header from "./HeaderComponent";
//import Navbar from "./components/layout/Navbar";

//import PrivateRoute from "./components/private-route/PrivateRoute";
//import Dashboard from "./components/dashboard/Dashboard";

import RequestTable from "./RequestTable";
import OrderTable from "./OrderTable";
// import { InStockTable } from "./InStockTable";
// import { OutOfStockTable } from "./OutOfStockTable";
import { StatsComponent } from "./StatsComponent";
import { HomeComponent } from "./HomeComponent";

import { logoutUser } from "../actions/ActionCreators";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Landing from "../components/layout/Landing";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = {
  logoutUser: () => (logoutUser())
};

class Main extends Component {
  
  render() {
    return (
      <div>
        <Header auth={this.props.auth} logoutUser={this.props.logoutUser} />
        <br />
        { this.props.auth.isAuthenticated === true ? 
          (
            <Switch>
              <Route exact path="/home" component={HomeComponent} />
              <Route exact path="/requests" component={RequestTable} />
              <Route exact path="/orders" component={OrderTable} />
              {/* <Route exact path="/requests" render={() => 
                <RequestTable auth={this.props.auth} addRequest={ this.props.addRequest } />} /> */}
              <Route exact path="/stats" component={StatsComponent} />
              <Redirect to="/stats" />
            </Switch>
          ) 
          : 
          (
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          )
        }
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));