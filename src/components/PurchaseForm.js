import React, { Component } from "react";
//import { LocalForm, Control, Errors } from 'react-redux-form';
import { Field, reduxForm } from 'redux-form';
import { Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody} from "reactstrap";

import { fetchLastOrder, addOrder, deleteRequest } from "../actions/ActionCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

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
            isModalOpen: false,
            tracking: '',
            pdfdata: ''
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.onTrackingChange = this.onTrackingChange.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }
    
    componentDidMount() {
        this.props.fetchLastOrder();
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    onTrackingChange(e) {
        e.preventDefault();
        this.setState({ tracking: e.target.value });
        //alert('tracking now is = ' + e.target.value);
    }

    onFileChange(e) {
        e.preventDefault();
        //console.log(e.target.files[0], "$$$$");
        const file = e.target.files[0];
        this.setState({ pdfdata: file });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.fetchLastOrder();
 
        const lastOrderId = this.props.lastId.lastOrder[0];
        const newId = lastOrderId.id + 1; 

        let r = this.props.request;           

        const item_id = r._id; 
        const tracking = this.state.tracking;
        const orderdate = new Date().toISOString();
        const orderuser = this.props.auth.user.name; 
        const pdfdata = this.state.pdfdata; 

        const formData = new FormData();

        formData.append('item_id', item_id); 
        formData.append('id', newId); 
        formData.append('tracking', tracking); 
        formData.append('orderdate', orderdate); 
        formData.append('orderuser', orderuser); 
        formData.append('pdfdata', pdfdata); 

        // const newOrder = {
        //     id: newId,  
        //     //category: "request",
        //     ...values,
        //     orderdate: new Date().toISOString(),
        //     orderuser: this.props.auth.user.name
        // };

        //this.props.addOrder(newOrder);
        this.props.addOrder(formData);

        this.props.deleteRequest(item_id);

        this.toggleModal();

        //alert('Current state is: ' + JSON.stringify(formData) );
        //alert('Current state is: ' + formData);
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
                        Purchase confirmation of:
                        <hr/>
                        <h4 className="text-primary">{r.article}</h4>
                        <h5 className="text-info">{r.index}</h5>
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="tracking">Tracking number: </Label>
                                <Input type="text" name="tracking" id="tracking" 
                                    value={this.state.tracking} onChange={this.onTrackingChange}
                                />
                            </FormGroup>    
                            <FormGroup>
                                <Label for="pdfdata">Choose the Internal Order Form to upload: </Label>
                                <Input type="file" name="pdfdata" id="pdfdata" 
                                    onChange={this.onFileChange}
                                />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PurchaseForm));