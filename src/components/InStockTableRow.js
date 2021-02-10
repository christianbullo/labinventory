import React, { Component } from "react";
import { Button, Label, Modal, ModalHeader, ModalBody} from "reactstrap";

import Moment from "react-moment";

export class InStockTableRow extends Component {
    render() {
        let i = this.props.item; 

        return(
            <tr>
                <td> {i.id} </td>
                <td> {i.article} </td>
                <td> {i.index} </td>
                <td> {i.location} </td>
                <td> {i.quantity} </td>
                <td> <Moment format="ll">{i.deliverydate}</Moment></td>
                <td> {i.deliveryuser} </td>
                <td>
                    <Button outline onClick={this.toggleModal}>
                        <i className="fa fa-search" />
                    </Button>
                </td>
                <td>
                    <Button outline onClick={this.toggleModal}>
                        <i className="fa fa-pencil" />
                    </Button>
                </td>
            </tr>
        );
    }
}