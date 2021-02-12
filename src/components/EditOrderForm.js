import React, { Component } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody} from "reactstrap";

import { editOrder } from "../actions/ActionCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return { 
        lastId: state.lastId
    };
};

const mapDispatchToProps = {
    editOrder: () => (editOrder())
};

class EditOrderForm extends Component {

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
        //e.preventDefault();
        // const status = e.target.value;
        
        // (status.length !== 0) ?
        // this.setState({ status: status, isError: false }) : 
        // this.setState({ status: "" }) 

        this.setState({ status: event.target.value })

        //alert ('status is ' + this.state.status);
    }

    handleSubmit(event) {
        event.preventDefault();

        if (!this.state.status) 
        {   
            return this.setState({
                isError: true 
            });
        }

        const order = this.props.order;
        const orderId = order._id;

        const status = this.state.status;
        //alert('status & orderId = ' + status + " " + orderId);

        // const updateOrder = {
        //     item_id: orderId,  
        //     status: status 
        // };

        const formData = new FormData();
        
        formData.append('item_id', orderId); 
        formData.append('status', status); 

        //alert('updateOrder = ', updateOrder); 
        //alert('formData is ' + formData.get('item_id') + "" + formData.get('status'));
  
        this.props.editOrder(formData);

        this.toggleModal();

    }

    render() {
        let o = this.props.order;

        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil" /> 
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Editing item:
                        <hr/>
                        <h4 className="text-primary">{o.tracking}</h4>
                        <h5 className="text-info">{o.article}</h5>
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={(values) => this.handleSubmit(values)}>
                            <FormGroup>
                                <Label for="status">Status: </Label>
                                <Col sm={10}>
                                    <Input type="select" name="status" id="status"
                                        onChange={this.onChangeStatus}
                                        invalid={this.state.isError && !this.state.status}
                                    >
                                        <option value="">Select</option>
                                        <option value="On Schedule">On Schedule</option>
                                        <option value="Delayed">Delayed</option>
                                        <option value="Now arriving">Now arriving</option>
                                        <option value="Arrived">Arrived</option>
                                    </Input>
                                </Col>
                                {(this.state.isError && !this.state.status) ? (
                                    <div>
                                        <p className="text-danger">Status is required.</p>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditOrderForm));