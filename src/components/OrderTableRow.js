import React, { Component } from "react";

import PdfComponent from "./PdfComponent";
import EditOrderForm from "./EditOrderForm";
import DeliveredForm from "./DeliveredForm";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Moment from "react-moment";

const mapStateToProps = state => {
    return { 
        auth: state.auth
    };
};

class OrderTableRow extends Component {

    render() {
        let o = this.props.order;

        return(
            <tr>
                <td> {o.id} </td>
                <td> {o.tracking} </td>
                <td> {o.status} </td>
                <td> {o.article} </td>
                <td> <Moment format="ll">{o.orderdate}</Moment> </td>
                <td> {o.orderuser} </td>
                <td>
                    <PdfComponent order={o} />  
                </td>
                <td>
                    <EditOrderForm order={o} />
                    {/* <Button outline onClick={this.toggleModal}>
                        <i className="fa fa-pencil" />
                    </Button> */}
                </td>
                <td>
                    <DeliveredForm auth={ this.props.auth } order={o} />  
                    {/* <Button outline onClick={this.toggleModal} className="text-info">
                        <span className="text-info">Delivered</span> 
                    </Button> */}
                </td>
            </tr>
        );
    }
}

export default withRouter(connect(mapStateToProps)(OrderTableRow));