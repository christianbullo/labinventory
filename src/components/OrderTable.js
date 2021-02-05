import React, { Component } from "react";
import { OrderTableRow } from "./OrderTableRow";

export class OrderTable extends Component {
    render() {
        return(
            <div className="container-fluid">
                <table className="table table-sm table-striped table-boredered">
                    <thead>
                        <tr>
                            <th colSpan="12" className="bg-secondary text-white text-center h4 p-2">
                                Incoming Orders    
                            </th>
                        </tr>
                        <tr>
                            <th>ID</th>
                            <th>Catalog</th>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Unit size</th>
                            <th>Unit cost</th>
                            <th>Total cost</th>
                            <th>Vendor</th>
                            <th>Request date</th>
                            <th>Request user</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   
                            this.props.orders.map(o => 
                                <OrderTableRow order={ o }
                                    key={ o.id }  
                                />)
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}