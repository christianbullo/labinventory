import React, { Component } from "react";
import { OutOfStockTableRow } from "./OutOfStockTableRow";

export class OutOfStockTable extends Component {
    render() {
        return(
            <div className="container-fluid">
                <table className="table table-sm table-striped table-boredered">
                    <thead>
                        <tr>
                            <th colSpan="12" className="bg-secondary text-white text-center h4 p-2">
                                Out Of Stock     
                            </th>
                        </tr>
                        <tr>
                            <th>ID</th>
                            <th>Catalog</th>
                            <th>Product</th>
                            <th>Delivery date</th>
                            <th>Delivery notes</th>
                            <th>Delivery user</th>
                            <th>Delivery date</th>
                            <th>Delivery user</th>
                            <th>Radioactive</th>
                            <th>Qty</th>
                            <th>Unit size</th>
                            <th>Total cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   
                            this.props.stock
                                .filter(item => item.outofstock === true)
                                .map(item => 
                                    <OutOfStockTableRow item={ item }
                                        key={ item.id }  
                                    />)
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}