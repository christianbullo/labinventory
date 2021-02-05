import React, { Component } from "react";
import { Button, Label, Modal, ModalHeader, ModalBody} from "reactstrap";
import { LocalForm, Control, Errors } from 'react-redux-form';

const required = val => val && val.length; 
const maxLength = len => val => !val || (val.length <= len); 
const minLength = len => val => val && (val.length >= len); 
const isNumber = val => !isNaN(+val); 
const validEmail = val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val); 

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
        //alert('Current state is: ' + JSON.stringify(values));
    }

    render() {
        return(
            <div>
                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil fa-lg" /> {' '} <span className="text-danger">Create New Request</span> 
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Request</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={ (values) => this.handleSubmit(values) }>
                            <div className="form-group">
                                <Label htmlFor="catalog">Catalog No</Label>
                                <Control.text className="form-control" model=".catalog" id="catalog" name="catalog" 
                                    validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".catalog"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be at least 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                /> 
                            </div>
                            <div className="form-group">
                                <Label htmlFor="product">Product</Label>
                                <Control.text className="form-control" model=".product" id="product" name="product" 
                                    validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(30)
                                        }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".product"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be at least 2 characters',
                                        maxLength: 'Must be 30 characters or less'
                                    }}
                                /> 
                            </div>
                            <div className="form-group">
                                <Label htmlFor="radioactive">Radioactive</Label>
                                <Control.text className="form-control" model=".radioactive" id="radioactive" name="radioactive" 
                                    validators={{
                                            required,
                                            maxLength: maxLength(1)
                                        }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".radioactive"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        required: 'Required',
                                        maxLength: 'Must be 1 characters (Y/N)'
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
                                <Label htmlFor="unitsize">Unit size</Label>
                                <Control.text className="form-control" model=".unitsize" id="unitsize" name="unitsize" 
                                    validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(30)
                                        }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".unitsize"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be at least 2 characters',
                                        maxLength: 'Must be 30 characters or less'
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
                            <div className="form-group">
                                <Label htmlFor="totalcost">Total cost</Label>
                                <Control.text className="form-control" model=".totalcost" id="totalcost" name="totalcost" 
                                    validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(30)
                                        }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".totalcost"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be at least 2 characters',
                                        maxLength: 'Must be 30 characters or less'
                                    }}
                                /> 
                            </div>
                            <div className="form-group">
                                <Label htmlFor="vendor">Vendor name</Label>
                                <Control.text className="form-control" model=".vendor" id="vendor" name="vendor" 
                                    validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(30)
                                        }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".vendor"
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
