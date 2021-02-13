import React, { Component } from "react";
import { Button} from "reactstrap";
import PdfComponent from "./PdfComponent";
import ImgComponent from "./ImgComponent";
import EditStockForm from "./EditStockForm";
import Moment from "react-moment";

export class InStockTableRow extends Component {
    render() {
        let i = this.props.item; 

        return(
            <tr>
                <td> {i.id} </td>
                <td> {i.article} </td>
                <td>
                    <Button outline onClick={this.toggleModal}>
                        <i className="fa fa-search" />
                    </Button>
                </td>
                <td>
                    <PdfComponent item={i} />  
                </td>
                <td> <Moment format="ll">{i.deliverydate}</Moment></td>
                <td> {i.deliveryuser} </td>
                <td> {i.location} </td>
                <td>
                    <ImgComponent item={i} />  
                </td>
                <td> {i.quantity} </td>
                <td>
                    <EditStockForm item={i}/>
                </td>
                <td>
                    <Button outline onClick={this.toggleModal}>
                        <span className="text-info">Out of Stock</span> 
                    </Button>
                </td>
            </tr>
        );
    }
}