import React, { Component } from "react";
import { Button } from "reactstrap";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/ActionCreators";

import Accordion from "./Accordion";

import imageUrl from "../../assets/images/dashboard_background.JPG";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (

        <React.Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <br/>
                        <br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-1 col-xs-4"></div>
                    <div className="col-sm-4">
                        <h2 className="text-color-grey"><b>Hey there,</b> {user.name.split(" ")[0]}</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-1 col-xs-4"></div>
                    <div className="col-sm-9">
                        {/* <Accordion />  */}
                    </div>
                    <div className="col"></div>
                </div>
                <div className="row">
                    <div className="col">
                        <br/>
                        <br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4"></div>
                    <div className="col">
                        <img src={imageUrl} />
                    </div>
                    <div className="col"></div>
                </div>
                <div className="row">
                    <div className="col"></div>
                    <div className="col-sm-9">
                        <hr/>
                    </div>
                    <div className="col"></div>
                </div>
                <div className="row">
                    <div className="col"></div>
                    <div className="col-sm-9 text-center">
                        <Button outline onClick={this.onLogoutClick}>Logout</Button>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);

