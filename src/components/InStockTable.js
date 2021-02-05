import React, { Component } from "react";
import { InStockTableRow } from "./InStockTableRow";

export class InStockTable extends Component {
    render() {
        return(
            <div className="container-fluid">
                <table className="table table-sm table-striped table-boredered">
                    <thead>
                        <tr>
                            <th colSpan="12" className="bg-secondary text-white text-center h4 p-2">
                                In Stock     
                            </th>
                        </tr>
                        <tr>
                            <th>ID</th>
                            <th>Catalog</th>
                            <th>Product</th>
                            <th>Location</th>
                            <th>Sublocation</th>
                            <th>Radioactive</th>
                            <th>Qty</th>
                            <th>Unit size</th>
                            <th>Unit cost</th>
                            <th>Total cost</th>
                            <th>Vendor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   
                            this.props.stock
                                .filter(item => item.outofstock === false)
                                .map(item => 
                                    <InStockTableRow item={ item }
                                        key={ item.id }  
                                    />)
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}