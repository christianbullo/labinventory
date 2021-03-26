import React, { Component } from "react";
import PdfComponent from "./PdfComponent";
import Moment from "react-moment";

export class OutOfStockTableRow extends Component {
    render() {
        let i = this.props.item;

        return(
            <tr>
                <td> {i.id} </td>
                <td> {i.article} </td>
                <td> {i.index} </td>
                <td> <Moment format="ll">{i.deliverydate}</Moment></td>
                <td> {i.deliveryuser} </td>
                <td> <Moment format="ll">{i.orderdate}</Moment></td>
                <td> {i.orderuser} </td>
                <td>
                    <PdfComponent item={i} />  
                </td>
            </tr>
        );
    }
}