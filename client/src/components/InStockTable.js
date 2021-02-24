import React, { Component } from "react";
import InStockTableRow from "./InStockTableRow";

import { fetchInStock, addInStock , deleteInStock } from "../actions/ActionCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Loading } from "./LoadingComponent";
import { NoItemsComponent } from "./NoItemsComponent";
import Pagination from "./Pagination";

const mapStateToProps = state => {
    return {
        auth: state.auth,
        instock: state.instock  
    };
};
  
const mapDispatchToProps = {
    fetchInStock: (pageData) => (fetchInStock(pageData)),
    addInStock: (stock) => (addInStock(stock)),
    deleteInStock: (oldInstockId) => (deleteInStock(oldInstockId))
};

class InStockTable extends Component {
    
    constructor(props) {
        super(props);
        this.onChangePage = this.onChangePage.bind(this);
    }
    
    onChangePage(newPage) {
        this.props.fetchInStock(newPage);
    }

    componentDidMount() {
        const actualPage = this.props.instock.page;
        this.props.fetchInStock(actualPage);
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if ((prevProps.instock.instock.length !== this.props.instock.instock.length)) {
    //         const actualPage = this.props.instock.page; 
    //         this.props.fetchInStock(actualPage);   
    //     }
    // }

    render() {

        const arrStock = this.props.instock.instock;
        
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
                            <th>Qty now</th> 
                            <th></th>
                            <th>Details</th>  
                            <th>Edit Details</th> 
                            <th>Location</th>
                            <th></th> 
                            <th>Edit Location</th> 
                            <th></th> 
                        </tr>
                    </thead>
                    <tbody>
                        {   
                            this.props.instock.instock
                                .map(item => 
                                    <InStockTableRow 
                                        item={ item }
                                        key={ item._id }  
                                        auth={ this.props.auth }
                                        length={arrStock.length} 
                                    />)
                        }
                    </tbody>
                </table>
                {
                    (this.props.instock.pages === 0) 
                        ? (<NoItemsComponent />) 
                        : (  
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col"></div>
                                    <div className="col text-center">
                                        <Pagination 
                                            numpage={this.props.instock.page} 
                                            numpages={this.props.instock.pages} 
                                            changePage={this.onChangePage}
                                        />  
                                    </div>
                                    <div className="col"></div>
                                </div>
                            </div>
                        )
                }
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InStockTable));