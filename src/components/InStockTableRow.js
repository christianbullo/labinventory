import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import PdfComponent from "./PdfComponent";
import ImgComponent from "./ImgComponent";
import EditStockForm from "./EditStockForm";
import DetailsComponent from "./DetailsComponent";
//import OutOfStockForm from "./OutOfStockForm";
import EditOutOfSTockForm from "./EditOutOfStockForm";
//import Moment from "react-moment";

const mapStateToProps = state => {
    return { 
        auth: state.auth
    };
};

class InStockTableRow extends Component {
    render() {
        let i = this.props.item; 

        return(
            <tr>
                <td> {i.id} </td>
                <td> {i.article} </td>
                <td>
                    <DetailsComponent item={i} />
                </td>
                <td>
                    <PdfComponent item={i} />  
                </td>
                {/* <td> <Moment format="ll">{i.deliverydate}</Moment></td>
                <td> {i.deliveryuser} </td> */}
                <td> {i.location} </td>
                <td>
                    <ImgComponent item={i} />  
                </td>
                <td> {i.quantity} </td>
                <td>
                    <EditStockForm auth={ this.props.auth } item={i}/>
                </td>
                <td>
                    <EditOutOfSTockForm item={i} />  
                </td>
                {/* <td>
                    <OutOfStockForm auth={ this.props.auth } item={i} />
                </td> */}
            </tr>
        );
    }
}

export default withRouter(connect(mapStateToProps)(InStockTableRow));