import React, { Component } from "react";

export class OrderTableRow extends Component {
    render() {
        let o = this.props.order;

        return(
            <tr>
                <td> {o.id} </td>
                <td> {o.catalog} </td>
                <td> {o.product} </td>
                <td> {o.quantity} </td>
                <td> {o.unitsize} </td>
                <td> {o.unitcost} </td>
                <td> {o.totalcost} </td>
                <td> {o.vendor} </td>
                <td> {o.requestdate} </td>
                <td> {o.requestuser} </td>
            </tr>
        );
    }
}