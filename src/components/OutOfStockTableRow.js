import React, { Component } from "react";
import { Button} from "reactstrap";
import Moment from "react-moment";

export class OutOfStockTableRow extends Component {
    render() {
        let i = this.props.item;

        return(
            <tr>
                <td> {i.id} </td>
                <td> {i.article} </td>
                <td> {i.index} </td>
                <td> <Moment format="ll">{i.orderdate}</Moment></td>
                <td> {i.orderuser} </td>
                <td> <Moment format="ll">{i.deliverydate}</Moment></td>
                <td> {i.deliveryuser} </td>
                <td>
                    <Button outline onClick={this.triggerPDF}>
                        <i className="fa fa-file-pdf-o" />
                    </Button>
                </td>
            </tr>
        );
    }
}