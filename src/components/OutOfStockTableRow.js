import React, { Component } from "react";

export class OutOfStockTableRow extends Component {
    render() {
        let i = this.props.item;

        return(
            <tr>
                <td> {i.id} </td>
                <td> {i.catalog} </td>
                <td> {i.product} </td>
                <td> {i.deliverydate} </td>
                <td> {i.deliverynotes} </td>
                <td> {i.deliveryuser} </td>
                <td> {i.requestdate} </td>
                <td> {i.requestuser} </td>
                <td> {i.radioactive} </td>
                <td> {i.quantity} </td>
                <td> {i.unitsize} </td>
                <td> {i.totalcost} </td>
            </tr>
        );
    }
}