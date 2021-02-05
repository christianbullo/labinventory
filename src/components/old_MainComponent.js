import React, { Component } from "react";
import Header from "./HeaderComponent";
import { RequestTable } from "./RequestTable";
// import { OrderTable } from "./OrderTable";
// import { InStockTable } from "./InStockTable";
// import { OutOfStockTable } from "./OutOfStockTable";
//import { StatsComponent } from "./StatsComponent";
//import { addRequest, addOrder, deleteRequest } from "../store/ActionCreators";
import { logoutUser } from "../actions/ActionCreators";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
//import { HomeComponent } from "./HomeComponent";
import Landing from "../components/layout/Landing";

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};
// const mapStateToProps = state => ({
//   auth: state.auth
// });

const mapDispatchToProps = {
  logoutUser: () => (logoutUser())
};

class Main extends Component {
  render() {
    return (
      <div>
        <Header auth={this.props.auth} logoutUser={this.props.logoutUser} />
        { this.props.auth.isAuthenticated === true ? (
                                <p>mah!!!!!!!</p>
                            ) : (
                              <div>
            
            <Route exact path="/" component={Landing} />
          </div>
                            )} 
        <br /> 
        <Switch>
          <Route exact path="/requests" component={ RequestTable } />
          {/* <Route exact path="/stats" component={ StatsComponent } /> */}
          {/* <Route exact path="/requests" render={() => 
            <RequestTable requests={this.props.requests} 
                addRequest={this.props.addRequest} 
                addOrder={this.props.addOrder}  
                deleteRequest={ this.props.deleteRequest }
            /> } />
          <Route exact path="/orders" render={() => 
            <OrderTable orders={this.props.orders} /> } />
          <Route exact path="/instock" render={() => 
            <InStockTable stock={this.props.stock} /> } />
          <Route exact path="/outofstock" render={() => 
            <OutOfStockTable stock={this.props.stock} /> } /> */}
          {/* <Redirect to="/stats" /> */}
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));