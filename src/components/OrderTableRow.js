import React, { Component } from "react";
import { Button, Label, Modal, ModalHeader, ModalBody} from "reactstrap";
import PdfComponent from "./PdfComponent";
import EditOrderForm from "./EditOrderForm";
import Moment from "react-moment";

export class OrderTableRow extends Component {
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
                    <Button outline onClick={this.toggleModal} className="text-info">
                        <span className="text-info">Delivered</span> 
                    </Button>
                </td>
            </tr>
        );
    }
}