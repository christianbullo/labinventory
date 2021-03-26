import React, { Component } from "react";
import PdfComponent from "./PdfComponent";
import Moment from "react-moment";
import PdfUpdateComponent from "./PdfUpdateComponent";
import DetailsComponent from "./DetailsComponent";
import NumberFormat from 'react-number-format';

export class OutOfStockTableRow extends Component {
    render() {
        let i = this.props.item;

        return(
            <tr>
                <td> {i.id} </td>
                <td> {i.article} </td>
                <td> 
                    {i.pdfname ? (<PdfComponent item={i} />) : (<PdfUpdateComponent item={i} />)}
                </td>
                <td> {i.index} </td>
                <td>
                    <DetailsComponent item={i} />
                </td>  
                <td> <NumberFormat value={i.unitcost} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </td>
                <td> <NumberFormat value={i.totalcost} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </td>
                {/* <td> {i.totalcost / i.unitcost} <NumberFormat value={i.totalcost / i.unitcost} displayType={'text'} decimalSeparator={true} /> </td> */}
            </tr>
        );
    }
}