import React, { Component } from "react";
import RequestTableRow  from "./RequestTableRow";
import RequestForm from "./RequestForm";

import { fetchRequests, addRequest } from "../actions/ActionCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Loading } from "./LoadingComponent";
import { NoItemsComponent } from "./NoItemsComponent";
import Pagination from "./Pagination";

import { CSSTransition, TransitionGroup } from "react-transition-group";

const mapStateToProps = state => {
    return {
        auth: state.auth,
        requests: state.requests 
    };
};
  
const mapDispatchToProps = {
    fetchRequests: (pageData) => (fetchRequests(pageData)),
    addRequest: (request) => (addRequest(request))
};

class RequestTable extends Component {

    constructor(props) {
        super(props);
        this.onChangePage = this.onChangePage.bind(this);
    }
    
    onChangePage(newPage) {
        this.props.fetchRequests(newPage);
    }

    componentDidMount() {
        const pageData = this.props.requests.page;
        this.props.fetchRequests(pageData);
    }

    render() {
        
        const arrReq = this.props.requests.requests;

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
                            <th>Index</th>
                            <th>Quantity</th>
                            <th>Unit Cost</th>
                            <th>Requested on</th>
                            <th>Requested by</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <TransitionGroup component={null}>
                            {this.props.requests.requests.map(r => 
                                <CSSTransition
                                    timeout={500}
                                    classNames="fade"
                                >   
                                    <RequestTableRow 
                                        request={ r }
                                        key={ r._id } 
                                        auth={ this.props.auth }
                                        length={arrReq.length} 
                                    />
                                </CSSTransition>
                            )}
                        </TransitionGroup>
                    </tbody>
                </table>
                {
                    (this.props.requests.pages === 0) ? (<NoItemsComponent />) : ( <div />)
                }
                <hr/>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-3 text-center">
                            <RequestForm auth={ this.props.auth } addRequest={ this.props.addRequest }/>
                        </div>
                    </div>
                </div>
                <hr/>
                <br/>
                {
                    (this.props.requests.pages !== 0)  
                        ? (  
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col"></div>
                                    <div className="col-3 text-center">
                                        <Pagination 
                                            numpage={this.props.requests.page} 
                                            numpages={this.props.requests.pages} 
                                            changePage={this.onChangePage}
                                        />  
                                    </div>
                                    <div className="col"></div>
                                </div>
                            </div>
                        ) 
                        : ( <div />)
                }
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RequestTable));