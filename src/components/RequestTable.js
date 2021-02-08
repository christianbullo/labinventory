import React, { Component } from "react";
import { RequestTableRow } from "./RequestTableRow";
import RequestForm from "./RequestForm";

import { fetchRequests, addRequest } from "../actions/ActionCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Loading } from "./LoadingComponent";
import { NoItemsComponent } from "./NoItemsComponent";

const mapStateToProps = state => {
    return {
        auth: state.auth,
        requests: state.requests 
    };
};
  
const mapDispatchToProps = {
    fetchRequests: () => (fetchRequests()),
    addRequest: (request) => (addRequest(request)),  
};

class RequestTable extends Component {

    componentDidMount() {
        this.props.fetchRequests();
    }

    render() {
        
        if (this.props.requests.isLoading) {
            return <Loading />
        }
         
        if (this.props.requests.errMess) {
            return(
                <div className="container">
                    <div class="row justify-content-center">
                        <div class="col-3 text-center">
                            <h4> { this.props.requests.errMess } </h4>
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
                                REQUESTS BOARD       
                            </th>
                        </tr>
                        <tr>
                            <th>ID</th>
                            <th>Article</th>
                            <th>Quantity</th>
                            <th>Unit Cost</th>
                            <th>Requested on</th>
                            <th>Requested by</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   
                            this.props.requests.requests.map(r => 
                            <RequestTableRow 
                                request={ r }
                                key={ r.id } 
                            />
                            )
                        }
                    </tbody>
                </table>
                {
                    (this.props.requests.requests.length === 0) ? (<NoItemsComponent />) : ( <div />)
                }
                <hr/>
                <div className="container">
                    <div class="row justify-content-center">
                        <div class="col-3 text-center">
                            <RequestForm auth={ this.props.auth } addRequest={ this.props.addRequest }/>
                        </div>
                    </div>
                </div>
                <hr/>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RequestTable));