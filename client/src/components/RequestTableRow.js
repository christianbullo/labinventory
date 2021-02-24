import React, { Component } from "react";

import PurchaseForm from "./PurchaseForm";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { fetchRequests } from "../actions/ActionCreators";

import Moment from "react-moment";

const mapStateToProps = state => {
    return { 
        auth: state.auth,
        requests: state.requests 
    };
};

const mapDispatchToProps = {
    fetchRequests: (pageData) => (fetchRequests(pageData))
};

class RequestTableRow extends Component {

    render() {
        let r = this.props.request;

        return(
            <tr>
                <td> {r.id} </td>
                <td> {r.article} </td>
                <td> {r.index} </td>
                <td> {r.quantity} </td>
                <td> {r.unitcost} </td>
                <td> <Moment format="ddd, MMM DD, YYYY">{r.requestdate}</Moment> </td>
                <td> {r.requestuser} </td>
                <td>
                    <PurchaseForm auth={ this.props.auth } request={ r } length={ this.props.length } /> 
                </td>
            </tr>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RequestTableRow));