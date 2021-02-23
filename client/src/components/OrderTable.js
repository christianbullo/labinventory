import React, { Component } from "react";
import OrderTableRow from "./OrderTableRow";

import { fetchOrders, addInStock, deleteOrder } from "../actions/ActionCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Loading } from "./LoadingComponent";
import { NoItemsComponent } from "./NoItemsComponent";
import Pagination from "./Pagination";

const mapStateToProps = state => {
    return {
        auth: state.auth,
        orders: state.orders  
    };
};
  
const mapDispatchToProps = {
    fetchOrders: (pageData) => (fetchOrders(pageData)),
    addInStock: (instock) => (addInStock(instock)),
    deleteOrder: (oldorder) => (deleteOrder(oldorder)),
};

class OrderTable extends Component {

    constructor(props) {
        super(props);
        this.onChangePage = this.onChangePage.bind(this);
    }
    
    onChangePage(newPage) {
        const pageData = {
            page: newPage
        };
        this.props.fetchOrders(newPage);
    }

    componentDidMount() {
        const actualPage = this.props.orders.page; 
        this.props.fetchOrders(actualPage);
    }

    render() {

        let numPage = this.props.orders.page;
        let numPages = this.props.orders.pages;

        if (this.props.orders.isLoading) {
            return <Loading />
        }
         
        if (this.props.orders.errMess) {
            return(
                <div className="container">
                    <div class="row justify-content-center">
                        <div class="col-3 text-center">
                            <h4> { this.props.orders.errMess } </h4>
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
                                INCOMING ORDERS     
                            </th>
                        </tr>
                        <tr>
                            <th>ID</th>
                            <th>Tracking</th>
                            <th>Status</th>
                            <th></th>
                            <th>Article</th>
                            <th></th>
                            <th>Purchased on</th>
                            <th>Ordered by</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {   
                            this.props.orders.orders.map(o => 
                                <OrderTableRow order={ o }
                                    key={ o._id }  
                                    auth={ this.props.auth }
                                />)
                        }
                    </tbody>
                </table>
                {
                    (this.props.orders.pages === 0) 
                        ? (<NoItemsComponent />) 
                        : (  
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col"></div>
                                    <div className="col text-center">
                                        <Pagination 
                                            numpage={numPage} 
                                            numpages={numPages} 
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderTable));