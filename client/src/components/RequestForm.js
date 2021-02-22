import React, { Component } from "react";
import { Button, Label, Modal, ModalHeader, ModalBody} from "reactstrap";
import { LocalForm, Control, Errors } from 'react-redux-form';

import { fetchLastRequest } from "../actions/ActionCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const required = val => val && val.length; 
const maxLength = len => val => !val || (val.length <= len); 
const minLength = len => val => val && (val.length >= len); 
const isNumber = val => !isNaN(+val); 
const isZero = val => val && (+val > 0);

const mapStateToProps = state => {
    return { 
        lastId: state.lastId
    };
};

const mapDispatchToProps = {
    fetchLastRequest: () => (fetchLastRequest())
};

class RequestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            //lastRequest: undefined 
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.handleLastRequest = this.handleLastRequest.bind(this);
    }
    
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    componentDidMount() {
        this.props.fetchLastRequest();
    }

    handleSubmit(values) {
        const arrReqLength = this.props.lastId.lastRequest.length;
        const lastRequest = this.props.lastId.lastRequest[arrReqLength - 1];
        const newId = lastRequest.id + 1; 

        const newRequest = {
            id: newId,  
            ...values,
            requestdate: new Date().toISOString(),
            requestuser: this.props.auth.user.name
        };

        this.props.addRequest(newRequest);
        this.toggleModal();

    }

    render() {
        
        return(
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="text-info">Add a new Request</span> 
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}><span className="text-info">New Request</span></ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={ (values) => this.handleSubmit(values) }>
                            <div className="form-group">
                                <Label htmlFor="article">Article</Label>
                                <Control.text className="form-control" model=".article" id="article" name="article" 
                                    validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(100)
                                        }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".article"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be at least 2 characters',
                                        maxLength: 'Must be 100 characters or less'
                                    }}
                                /> 
                            </div>
                            <div className="form-group">
                                <Label htmlFor="index">Index</Label>
                                <Control.text className="form-control" model=".index" id="index" name="index" 
                                    validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(100)
                                        }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".index"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be at least 2 characters',
                                        maxLength: 'Must be 100 characters or less'
                                    }}
                                /> 
                            </div>
                            <div className="form-group">
                                <Label htmlFor="quantity">Quantity</Label>
                                <Control.text className="form-control" model=".quantity" id="quantity" name="quantity" 
                                    validators={{
                                            required,
                                            minLength: minLength(1),
                                            maxLength: maxLength(30),
                                            isNumber,
                                            isZero
                                        }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".quantity"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be at least 1',
                                        maxLength: 'Must be 30 characters or less',
                                        isNumber: 'Must be a number',
                                        isZero: 'Must be a valid quantity'
                                    }}
                                /> 
                            </div>
                            <div className="form-group">
                                <Label htmlFor="unitcost">Unit cost</Label>
                                <Control.text className="form-control" model=".unitcost" id="unitcost" name="unitcost" 
                                    validators={{
                                            required,
                                            minLength: minLength(1),
                                            maxLength: maxLength(30),
                                            isNumber,
                                            isZero 
                                        }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".unitcost"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be at least 1 characters',
                                        maxLength: 'Must be 30 characters or less',
                                        isNumber: 'Must be a number',
                                        isZero: 'Must be a valid quantity'
                                    }}
                                /> 
                            </div>
                            <br/>
                            <Button type="submit" color="primary">Submit</Button> 
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>            
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RequestForm));