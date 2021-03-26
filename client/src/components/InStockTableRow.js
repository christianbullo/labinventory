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
import PdfUpdateComponent from "./PdfUpdateComponent";

const mapStateToProps = state => {
    return { 
        auth: state.auth,
        instock: state.instock  
    };
};

const mapDispatchToProps = {
    editLocation: (instock) => (editLocation(instock)),
    fetchInStock: (pageData) => (fetchInStock(pageData))
};

class InStockTableRow extends Component {
    render() {
        let i = this.props.item; 

        return(
            <tr>
                <td> {i.id} </td>
                <td> {i.article} </td>
                <td>
                    {i.pdfname ? (<PdfComponent item={i} />) : (<PdfUpdateComponent item={i} />)}
                </td>
                <td> {i.quantity} </td>
                <td>
                    <DetailsComponent item={i} />
                </td>                
                <td>
                    <EditStockForm auth={ this.props.auth } item={i}/>
                </td>
                {i.location ? (
                    <React.Fragment>
                        <td> {i.location} </td>
                        <td>
                            <ImgComponent item={i} />  
                        </td>        
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <td><span className="text-warning"><i>(missing)</i></span></td>
                        <td></td>
                    </React.Fragment>
                )}
                <td>
                    <EditLocation auth={ this.props.auth } item={i}/>
                </td>
                <td>
                    <EditOutOfSTockForm item={i} length={ this.props.length } />  
                </td>
            </tr>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InStockTableRow));