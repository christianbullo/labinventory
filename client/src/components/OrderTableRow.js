import React, { Component } from "react";

import PdfComponent from "./PdfComponent";
import EditOrderForm from "./EditOrderForm";
import DeliveredForm from "./DeliveredForm";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { fetchOrders } from "../actions/ActionCreators";

import Moment from "react-moment";

const mapStateToProps = state => {
    return { 
        auth: state.auth,
        orders: state.orders  
    };
};

const mapDispatchToProps = {
    fetchOrders: (pageData) => (fetchOrders(pageData))
};

class OrderTableRow extends Component {

    render() {
        let o = this.props.order;

        return(
            <tr>
                <td> {o.id} </td>
                <td> {o.tracking} </td>
                <td> {o.status} </td>
                <td>
                    <EditOrderForm order={o} />
                </td>
                <td> {o.article} </td>
                <td>
                    <PdfComponent item={o} />  
                </td>
                <td> <Moment format="ll">{o.orderdate}</Moment> </td>
                <td> {o.orderuser} </td>
                <td>
                    <DeliveredForm auth={ this.props.auth } order={o} length={ this.props.length } />  
                </td>
            </tr>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderTableRow));