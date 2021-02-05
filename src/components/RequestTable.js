import React, { Component } from "react";
import { RequestTableRow } from "./RequestTableRow";
import { RequestForm } from "./RequestForm";

export class RequestTable extends Component {
    render() {
        return(
            <div className="container-fluid">                
                <table className="table table-sm table-striped table-boredered">
                    <thead>
                        <tr>
                            <th colSpan="12" className="bg-secondary text-white text-center h4 p-2">
                                New Requests Board    
                            </th>
                        </tr>
                        <tr>
                            <th>ID</th>
                            <th>Catalog</th>
                            <th>Product</th>
                            <th>Radioactive</th>
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
                            this.props.requests.map(r => 
                                <RequestTableRow 
                                    request={ r }
                                    key={ r.id } 
                                    addOrder={ this.props.addOrder }
                                    deleteRequest={ this.props.deleteRequest } 
                                />)
                        }
                    </tbody>
                </table>
                <hr/>
                <div className="row">
                    <div className="col">
                    </div>   
                    <div className="col-3">
                        <RequestForm addRequest={ this.props.addRequest } />
                    </div>   
                    <div className="col">
                    </div>                    
                </div>
                <hr/>
            </div>
        );
    }
}