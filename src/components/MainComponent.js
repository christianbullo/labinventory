import React, { Component } from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";

import RequestTable from "./RequestTable";
import OrderTable from "./OrderTable";
import InStockTable from "./InStockTable";
// import OutOfStockTable from "./OutOfStockTable";
import { StatsComponent } from "./StatsComponent";
//import { HomeComponent } from "./HomeComponent";

import { logoutUser } from "../actions/ActionCreators";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Landing from "../components/layout/Landing";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import Dashboard from "../components/dashboard/Dashboard";

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
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/requests" component={RequestTable} />
              <Route exact path="/orders" component={OrderTable} />
              <Route exact path="/instock" component={InStockTable} />
              <Route exact path="/stats" component={StatsComponent} />
              <Redirect to="/" />
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
        <br />
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));