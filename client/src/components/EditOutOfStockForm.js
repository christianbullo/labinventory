import React, { Component } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody} from "reactstrap";

import { addOutStock, fetchInStock } from "../actions/ActionCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return { 
        lastId: state.lastId
    };
};

const mapDispatchToProps = {
    addOutStock: (formData) => (addOutStock(formData)),
    fetchInStock: () => (fetchInStock()),
};

class EditOutOfSTockForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            status: "",
            isError: false 
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen 
        });
    }

    onChangeStatus(event) {
        event.preventDefault();
        const status = event.target.value;
        
        (status.length !== 0) ?
        this.setState({ status: status, isError: false }) : 
        this.setState({ status: "" }) 
    }

    handleSubmit(event) {
        event.preventDefault();

        if (!this.state.status) 
        {   
            return this.setState({
                isError: true 
            });
        }

        const item = this.props.item;
        const itemId = item._id;

        const status = this.state.status;
        
        const updateItem = {
            item_id: itemId,  
            category: status 
        };

        this.props.addOutStock(updateItem);
        this.props.fetchInStock();
        this.toggleModal();

    }

    render() {
        let i = this.props.item;

        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                <span className="text-info">Out of Stock</span> 
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Setting as out of stock the item:
                        <hr/>
                        <h4 className="text-primary">{i.article}</h4>
                        {/* <h5 className="text-info">{i.article}</h5> */}
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="outofstock">Confirm new status: </Label>
                                <Col sm={10}>
                                    <Input type="select" name="outofstock" id="outofstock"
                                        onChange={this.onChangeStatus}
                                        invalid={this.state.isError && !this.state.status}
                                    >
                                        <option value="">Select</option>
                                        <option value="outofstock">Out of Stock</option>
                                    </Input>
                                </Col>
                                {(this.state.isError && !this.state.status) ? (
                                    <div>
                                        <p className="text-danger">New status is required.</p>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditOutOfSTockForm));