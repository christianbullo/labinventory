import React, { Component } from "react";
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Button, Label, Modal, ModalHeader, ModalBody} from "reactstrap";

import { fetchLastOrder, addOrder, deleteRequest } from "../actions/ActionCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Moment from "react-moment";

const required = val => val && val.length; 
const maxLength = len => val => !val || (val.length <= len); 
const minLength = len => val => val && (val.length >= len); 

const mapStateToProps = state => {
    return { 
        lastId: state.lastId
    };
};

const mapDispatchToProps = {
    fetchLastOrder: () => (fetchLastOrder()),
    addOrder: (order) => (addOrder(order)),
    deleteRequest: (oldrequest) => (deleteRequest(oldrequest))
};

class PurchaseForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false 
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
        this.props.fetchLastOrder();
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.props.fetchLastOrder();
 
        const lastOrderId = this.props.lastId.lastOrder[0];
        const newId = lastOrderId.id + 1; 
 
        const newOrder = {
            id: newId,  
            //category: "request",
            ...values,
            orderdate: new Date().toISOString(),
            orderuser: this.props.auth.user.name
        };

        this.props.addOrder(newOrder);

        this.props.deleteRequest(values.item_id);

        this.toggleModal();

        alert('Current state is: ' + JSON.stringify(newOrder) );
    }

    render() {
        let r = this.props.request;
        
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="text-info">Purchased</span> 
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        <h5>Purchase confirmation of the item {r.id}: </h5>
                        <hr/>
                        <h4 className="text-info">{r.article}</h4>
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={ (values) => {
                            const r_id = this.props.request._id;
                            const formData = {
                                ...values,
                                item_id: r_id 
                            };
                            this.handleSubmit(formData);
                        } }>
                            <div className="form-group">
                                <Label htmlFor="tracking">Tracking number: </Label>
                                <Control.text className="form-control" model=".tracking" id="tracking" name="tracking" 
                                    validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(100)
                                        }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".tracking"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be at least 2 characters',
                                        maxLength: 'Must be 100 characters or less'
                                    }}
                                /> 
                            </div>
                            {/* here handler upload PDF         */}
                            <hr/>
                            <i> -- here handler upload PDF -- </i>
                            <hr/>
                            <br/>
                            <Button type="submit" color="primary">Purchased</Button> 
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PurchaseForm));