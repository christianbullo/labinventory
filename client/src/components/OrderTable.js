import React, { Component } from "react";
import OrderTableRow from "./OrderTableRow";

import { fetchOrders, addInStock, deleteOrder } from "../actions/ActionCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Loading } from "./LoadingComponent";
import { NoItemsComponent } from "./NoItemsComponent";

const mapStateToProps = state => {
    return {
        auth: state.auth,
        orders: state.orders  
    };
};
  
const mapDispatchToProps = {
    fetchOrders: () => (fetchOrders()),
    addInStock: (instock) => (addInStock(instock)),
    deleteOrder: (oldorder) => (deleteOrder(oldorder)),
};

class OrderTable extends Component {

    componentDidMount() {
        this.props.fetchOrders();
    }

    componentDidUpdate() {
        this.props.fetchOrders();
    }

    render() {

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
                                    key={ o.id }  
                                    auth={ this.props.auth }
                                />)
                        }
                    </tbody>
                </table>
                {
                    (this.props.orders.orders.length === 0) ? (<NoItemsComponent />) : ( <div />)
                }
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderTable));