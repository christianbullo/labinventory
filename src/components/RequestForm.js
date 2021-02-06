import React, { Component } from "react";
import { Button, Label, Modal, ModalHeader, ModalBody} from "reactstrap";
import { LocalForm, Control, Errors } from 'react-redux-form';

const required = val => val && val.length; 
const maxLength = len => val => !val || (val.length <= len); 
const minLength = len => val => val && (val.length >= len); 
const isNumber = val => !isNaN(+val); 

export class RequestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false 
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addRequest(values);
        //console.log('Current state is: ' + JSON.stringify(values));
        alert('Current state is: ' + JSON.stringify(values));
    }

    render() {
        return(
            <div>
                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil fa-lg" /> {' '} <span className="text-danger">Submit a Request</span> 
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Request</ModalHeader>
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
                                <Label htmlFor="quantity">Quantity</Label>
                                <Control.text className="form-control" model=".quantity" id="quantity" name="quantity" 
                                    validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(30),
                                            isNumber
                                        }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".quantity"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be at least 2 characters',
                                        maxLength: 'Must be 30 characters or less',
                                        isNumber: 'Must be a number'
                                    }}
                                /> 
                            </div>
                            <div className="form-group">
                                <Label htmlFor="unitcost">Unit cost</Label>
                                <Control.text className="form-control" model=".unitcost" id="unitcost" name="unitcost" 
                                    validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(30)
                                        }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".unitcost"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be at least 2 characters',
                                        maxLength: 'Must be 30 characters or less'
                                    }}
                                /> 
                            </div>
                            <Button type="submit" color="primary">Submit Request</Button> 
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>            
        );
    }
}
