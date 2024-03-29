import React, { Component } from "react";
import { OutOfStockTableRow } from "./OutOfStockTableRow";

import { fetchOutStock, addOutStock } from "../actions/ActionCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Loading } from "./LoadingComponent";
import { NoItemsComponent } from "./NoItemsComponent";
import Pagination from "./Pagination";

import { Transition, CSSTransition, TransitionGroup } from "react-transition-group";

const mapStateToProps = state => {
    return {
        auth: state.auth,
        outstock: state.outstock  
    };
};
  
const mapDispatchToProps = {
    fetchOutStock: (pageData) => (fetchOutStock(pageData)),
    addOutStock: (stock) => (addOutStock(stock)),
};

class OutOfStockTable extends Component {

    constructor(props) {
        super(props);
        this.onChangePage = this.onChangePage.bind(this);
    }
    
    onChangePage(newPage) {
        const pageData = {
            page: newPage
        };
        this.props.fetchOutStock(newPage);
    }

    componentDidMount() {
        const actualPage = this.props.outstock.page;
        this.props.fetchOutStock(actualPage);        
    }

    render() {

        const stagger = 200;

        if (this.props.outstock.isLoading) {
            return <Loading />
        }
        
        if (this.props.outstock.errMess) {
            return(
                <div className="container">
                    <div class="row justify-content-center">
                        <div class="col-3 text-center">
                            <h4> { this.props.outstock.errMess } </h4>
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
                                ITEMS OUT OF STOCK     
                            </th>
                        </tr>
                        <tr>
                            <th>ID</th>
                            <th>Article</th>
                            <th>Order Form</th>
                            <th>Index</th>
                            <th>Details</th>
                            <th>Unit Cost</th>
                            <th>Total Cost</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <TransitionGroup component={null}>
                            {this.props.outstock.outstock.map((item, index) => 
                                <CSSTransition
                                    key={ item._id }
                                    in={true}
                                    appear={true}
                                    timeout={ stagger * index }
                                    classNames="fade2"
                                    // timeout={{ enter: 2000, exit: 1000 }}
                                    // classNames="fade"
                                >   
                                    <OutOfStockTableRow 
                                        item={ item }
                                        key={ item._id }  
                                    />
                                </CSSTransition>
                            )}
                        </TransitionGroup>
                    </tbody>
                </table>
                {
                    (this.props.outstock.pages === 0) 
                        ? (<NoItemsComponent />) 
                        : (  
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col"></div>
                                    <div className="col text-center">
                                        <Pagination 
                                            numpage={this.props.outstock.page} 
                                            numpages={this.props.outstock.pages} 
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutOfStockTable));