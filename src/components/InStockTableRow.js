import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { editLocation, fetchInStock } from "../actions/ActionCreators";

import PdfComponent from "./PdfComponent";
import ImgComponent from "./ImgComponent";
import EditStockForm from "./EditStockForm";
import DetailsComponent from "./DetailsComponent";
import EditOutOfSTockForm from "./EditOutOfStockForm";
import EditLocation from "./EditLocation";


const mapStateToProps = state => {
    return { 
        auth: state.auth
    };
};

const mapDispatchToProps = {
    editLocation: (instock) => (editLocation(instock)),
    fetchInStock: () => (fetchInStock())
};

class InStockTableRow extends Component {
    render() {
        let i = this.props.item; 

        return(
            <tr>
                <td> {i.id} </td>
                <td> {i.article} </td>
                <td> {i.quantity} </td>
                <td>
                    <PdfComponent item={i} />  
                </td>
                <td>
                    <DetailsComponent item={i} />
                </td>                
                <td>
                    <EditStockForm auth={ this.props.auth } item={i}/>
                </td>                
                <td> {i.location} </td>
                <td>
                    <ImgComponent item={i} />  
                </td>
                <td>
                    <EditLocation auth={ this.props.auth } item={i}/>
                </td>
                <td>
                    <EditOutOfSTockForm item={i} />  
                </td>
            </tr>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InStockTableRow));