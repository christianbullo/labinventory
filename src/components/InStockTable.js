import React, { Component } from "react";
import { InStockTableRow } from "./InStockTableRow";

import { fetchInStock } from "../actions/ActionCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Loading } from "./LoadingComponent";
import { NoItemsComponent } from "./NoItemsComponent";

const mapStateToProps = state => {
    return {
        auth: state.auth,
        instock: state.instock  
    };
};
  
const mapDispatchToProps = {
    fetchInStock: () => (fetchInStock()),
};

class InStockTable extends Component {
    
    componentDidMount() {
        this.props.fetchInStock();
    }

    render() {
        
        if (this.props.instock.isLoading) {
            return <Loading />
        }
        
        if (this.props.instock.errMess) {
            return(
                <div className="container">
                    <div class="row justify-content-center">
                        <div class="col-3 text-center">
                            <h4> { this.props.instock.errMess } </h4>
                        </div>
                    </div>
                </div>
            );
        }

        return(
            <div className="container-fluid">
                <table className="table table-sm table-striped table-boredered">
                    <thead>
                        <tr>
                            <th colSpan="12" className="bg-secondary text-white text-center h4 p-2">
                                ITEMS IN STOCK    
                            </th>
                        </tr>
                        <tr>
                            <th>ID</th>
                            <th>Article</th>
                            <th>Index</th>
                            <th>Location</th>
                            <th>Quantity</th> 
                            <th>Delivered on</th>
                            <th>Delivered by</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   
                            this.props.instock.instock
                                .map(item => 
                                    <InStockTableRow item={ item }
                                        key={ item.id }  
                                    />)
                        }
                    </tbody>
                </table>
                {
                    (this.props.instock.instock.length === 0) ? (<NoItemsComponent />) : ( <div />)
                }
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InStockTable));