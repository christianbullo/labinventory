import React, { Component } from "react";
import { OutOfStockTableRow } from "./OutOfStockTableRow";

import { fetchOutStock } from "../actions/ActionCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Loading } from "./LoadingComponent";
import { NoItemsComponent } from "./NoItemsComponent";

const mapStateToProps = state => {
    return {
        auth: state.auth,
        outstock: state.outstock  
    };
};
  
const mapDispatchToProps = {
    fetchOutStock: () => (fetchOutStock()),
};

class OutOfStockTable extends Component {

    componentDidMount() {
        this.props.fetchOutStock();
    }

    render() {

        if (this.props.outstock.isLoading) {
            return <Loading />
        }
        
        if (this.props.outstock.errMess) {
            return(
                <div className="container">
                    <div class="row justify-content-center">
                        <div class="col-3 text-center">
                            <h4> { this.props.outstock.errMess } </h4>
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
                                ITEMS OUT OF STOCK     
                            </th>
                        </tr>
                        <tr>
                            <th>ID</th>
                            <th>Article</th>
                            <th>Index</th>
                            <th>Purchased on</th>
                            <th>Ordered by</th>
                            <th>Delivered on</th>
                            <th>Delivered by</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   
                            this.props.outstock.outstock
                                .map(item => 
                                    <OutOfStockTableRow item={ item }
                                        key={ item.id }  
                                    />)
                        }
                    </tbody>
                </table>
                {
                    (this.props.outstock.outstock.length === 0) ? (<NoItemsComponent />) : ( <div />)
                }
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutOfStockTable));