import React, { Component } from "react";

export class RequestTableRow extends Component {

    render() {
        let r = this.props.request;

        return(
            <tr>
                <td> {r.id} </td>
                <td> {r.article} </td>
                <td> {r.quantity} </td>
                <td> {r.unitcost} </td>
                <td> {r.requestdate} </td>
                <td> {r.requestuser} </td>
                <td>
                    <button className="btn btn-light m-1" 
                        onClick={ () => {
                            //this.props.addOrder(r);
                            //this.props.deleteRequest(r);
                            alert(`The product: \n${r.catalog} / ${r.product},\nhas been ordered.\nPlease check on the page "Incoming Orders".`);
                        }  
                    }>
                        <p className="text-danger">Purchase</p>
                    </button>
                </td>
            </tr>
        );
    }
}