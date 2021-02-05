import React, { Component } from "react";

export class InStockTableRow extends Component {
    render() {
        let i = this.props.item; 

        return(
            <tr>
                <td> {i.id} </td>
                <td> {i.catalog} </td>
                <td> {i.product} </td>
                <td> {i.location} </td>
                <td> {i.sublocation} </td>
                <td> {i.radioactive} </td>
                <td> {i.quantity} </td>
                <td> {i.unitsize} </td>
                <td> {i.unitcost} </td>
                <td> {i.totalcost} </td>
                <td> {i.vendor} </td>
            </tr>
        );
    }
}