import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody} from "reactstrap";

import { editDetails, fetchInStock } from "../actions/ActionCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        instock: state.instock,   
        lastId: state.lastId
    };
};

const mapDispatchToProps = {
    editDetails: (instock) => (editDetails(instock)),
    fetchInStock: (pageData) => (fetchInStock(pageData))
};

class EditStockForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            isErrorQty: false, 
            quantity: "",
            isErrorAliq: false,
            aliquot: "",
            isErrorNotes: false,
            stocknotes: ""
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeAliquot = this.onChangeAliquot.bind(this);
        this.onChangeVendor = this.onChangeVendor.bind(this);
        this.onChangeContact = this.onChangeContact.bind(this);
        this.onChangeStocknotes = this.onChangeStocknotes.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            isErrorQty: false, 
            quantity: "",
            isErrorAliq: false,
            aliquot: "",
            isErrorVend: false,
            vendor: "",
            isErrorCont: false,
            contact: "",
            isErrorNotes: false,
            stocknotes: "" 
        });
    }

    onChangeQuantity(e) {
        e.preventDefault();
        const quantity = e.target.value; 

        const i = this.props.item;

        (quantity.length !== 0) ?
        this.setState({ quantity: quantity }) : 
        this.setState({ quantity: "" });
        
        const isZero = val => val && (+val > 0);
        const resultZ = isZero(quantity);

        if (quantity && !resultZ) {
            return this.setState({
                isErrorQty: true 
            });
        } else if (quantity >= i.quantity) {
            return this.setState({
                isErrorQty: true 
            });
        } else {
            return this.setState({
                isErrorQty: false  
            });
        }
    }

    onChangeAliquot(e) {
        e.preventDefault();
        const aliquot = e.target.value; 

        (aliquot.length !== 0) ?
        this.setState({ aliquot: aliquot }) : 
        this.setState({ aliquot: "" }) 

        const minLength = len => val => val && (val.length >= len); 
        const result = minLength(5)(aliquot);
        if (!result && aliquot) {
            return this.setState({
                isErrorAliq: true 
            });
        } else {
            return this.setState({
                isErrorAliq: false  
            });
        } 
    }

    onChangeVendor(e) {
        e.preventDefault();
        const vendor = e.target.value; 

        (vendor.length !== 0) ?
        this.setState({ vendor: vendor }) : 
        this.setState({ vendor: "" }) 

        const minLength = len => val => val && (val.length >= len); 
        const result = minLength(5)(vendor);
        if (!result && vendor) {
            return this.setState({
                isErrorVend: true 
            });
        } else {
            return this.setState({
                isErrorVend: false  
            });
        } 
    }

    onChangeContact(e) {
        e.preventDefault();
        const contact = e.target.value; 

        (contact.length !== 0) ?
        this.setState({ contact: contact }) : 
        this.setState({ contact: "" }) 

        const minLength = len => val => val && (val.length >= len); 
        const result = minLength(5)(contact);
        if (!result && contact) {
            return this.setState({
                isErrorCont: true 
            });
        } else {
            return this.setState({
                isErrorCont: false  
            });
        } 
    }

    onChangeStocknotes(e) {
        e.preventDefault();
        const stocknotes = e.target.value; 

        (stocknotes.length !== 0) ?
        this.setState({ stocknotes: stocknotes }) : 
        this.setState({ stocknotes: "" }) 

        const minLength = len => val => val && (val.length >= len); 
        const result = minLength(5)(stocknotes);
        if (!result && stocknotes) {
            return this.setState({
                isErrorNotes: true 
            });
        } else {
            return this.setState({
                isErrorNotes: false  
            });
        } 
    }

    handleSubmit(e) {
        e.preventDefault();
    
        if (this.state.isErrorAliq || this.state.isErrorNotes || this.state.isErrorQty) {
            return;
        }

        const i = this.props.item;           
        const item_id = i._id; 
        let newDetails = {}

        const quantity = this.state.quantity;
        const updateqtydate = new Date().toISOString();
        const updateqtyuser = this.props.auth.user.name;
        if (quantity.length) {
            newDetails.quantity = quantity;
            newDetails.updateqtydate = updateqtydate;
            newDetails.updateqtyuser = updateqtyuser; 
        }

        const aliquot = this.state.aliquot;
        const updatealiqdate = new Date().toISOString();
        const updatealiquser = this.props.auth.user.name;
        if (aliquot.length) {
            newDetails.aliquot = aliquot;
            newDetails.updatealiqdate = updatealiqdate;
            newDetails.updatealiquser = updatealiquser; 
        }

        const vendor = this.state.vendor;
        const contact = this.state.contact;
        const updatevendordate = new Date().toISOString();
        const updatevendoruser = this.props.auth.user.name;

        if (vendor.length) {
            newDetails.vendor = vendor;
        }

        if (contact.length) {
            newDetails.contact = contact;
        }

        if (vendor.length || contact.length) {
            newDetails.updatevendordate = updatevendordate;
            newDetails.updatevendoruser = updatevendoruser; 
        }

        const stocknotes = this.state.stocknotes;
        const updatenotedate = new Date().toISOString();
        const updatenoteuser = this.props.auth.user.name;

        if (stocknotes.length) {
            newDetails.stocknotes = stocknotes;
            newDetails.updatenotedate = updatenotedate;
            newDetails.updatenoteuser = updatenoteuser; 
        }

        if (Object.keys(newDetails).length) {
            newDetails.item_id = item_id; 
            this.props.editDetails(newDetails);
        }    
        const actualPage = this.props.instock.page;
        this.props.fetchInStock(actualPage);
        this.toggleModal();
    }

    render() {
        let i = this.props.item;

        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil" />
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Updating info of item:
                        <hr/>
                        <h4 className="text-primary">{i.article}</h4>
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="quantity">New Quantity: </Label>
                                <Input type="number" name="quantity" id="quantity" 
                                    onChange={this.onChangeQuantity}
                                    invalid={this.state.isErrorQty && this.state.quantity}
                                />
                                {(this.state.isErrorQty && this.state.quantity) ? (
                                    <div>
                                        <p className="text-danger">Must be a valid quantity, no equal or greater than the previous | In case of zero, set as out of stock.</p>
                                    </div>    
                                ) : ( <div /> )}            
                            </FormGroup>    
                            <FormGroup>
                                <Label for="aliquot">New Aliquot: </Label>
                                <Input type="text" name="aliquot" id="aliquot" 
                                    onChange={this.onChangeAliquot}
                                    invalid={this.state.isErrorAliq && this.state.aliquot}
                                />
                                {(this.state.isErrorAliq && this.state.aliquot) ? (
                                    <div>
                                        <p className="text-danger">Must be at least 5 characters.</p>
                                    </div>    
                                ) : ( <div /> )}            
                            </FormGroup>
                            <FormGroup>
                                <Label for="vendor">New Vendor: </Label>
                                <Input type="text" name="vendor" id="vendor" 
                                    onChange={this.onChangeVendor}
                                    invalid={this.state.isErrorVend && this.state.vendor}
                                />
                                {(this.state.isErrorVend && this.state.vendor) ? (
                                    <div>
                                        <p className="text-danger">Must be at least 5 characters.</p>
                                    </div>    
                                ) : ( <div /> )}            
                            </FormGroup>
                            <FormGroup>
                                <Label for="contact">New Contact: </Label>
                                <Input type="text" name="contact" id="contact" 
                                    onChange={this.onChangeContact}
                                    invalid={this.state.isErrorCont && this.state.contact}
                                />
                                {(this.state.isErrorCont && this.state.contact) ? (
                                    <div>
                                        <p className="text-danger">Must be at least 5 characters.</p>
                                    </div>    
                                ) : ( <div /> )}            
                            </FormGroup>
                            <FormGroup>
                                <Label for="stocknotes">New Additional Notes: </Label>
                                <Input type="text" name="stocknotes" id="stocknotes" 
                                    onChange={this.onChangeStocknotes}
                                    invalid={this.state.isErrorNotes && this.state.stocknotes}
                                />
                                {(this.state.isErrorNotes && this.state.stocknotes) ? (
                                    <div>
                                        <p className="text-danger">Must be at least 5 characters.</p>
                                    </div>    
                                ) : ( <div /> )}            
                            </FormGroup>
                            <br/>
                            <Button type="submit" color="primary">Submit</Button> 
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditStockForm));