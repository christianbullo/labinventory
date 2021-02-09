import React, { Component } from "react";
import { Button, Label, Modal, ModalHeader, ModalBody} from "reactstrap";

export class OrderTableRow extends Component {
    render() {
        let o = this.props.order;

        return(
            <tr>
                <td> {o.id} </td>
                <td> {o.tracking} </td>
                <td> {o.article} </td>
                <td> {o.index} </td>
                <td> {o.quantity} </td>
                <td> {o.unitcost} </td>
                <td> {o.orderdate} </td>
                <td> {o.orderuser} </td>
                <td>
                    <Button outline onClick={this.toggleModal}>
                        <i className="fa fa-pencil" />
                        {" "} 
                        <span className="text-info">Edit</span> 
                    </Button>
                </td>
            </tr>
        );
    }
}