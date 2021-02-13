import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody} from "reactstrap";

import { editStock } from "../actions/ActionCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return { 
        lastId: state.lastId
    };
};

const mapDispatchToProps = {
    editStock: (instock) => (editStock(instock)),
};

class EditStockForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            isError: false, 
            imgdata: "",
            location: ""
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    onChangeLocation(e) {
        e.preventDefault();
        const location = e.target.value; 

        (location.length !== 0) ?
        this.setState({ location: location }) : 
        this.setState({ location: "" }) 
    }

    onFileChange(e) {
        e.preventDefault();
        const file = e.target.files[0];
        
        (!file || file.type !== 'image/jpeg' 
            // || file.type !== 'image/apng' ||
            // file.type !== 'image/apng' || file.type !== 'image/avif' || 
            // file.type !== 'image/gif' || file.type !== 'image/png' || 
            // file.type !== 'image/svg+xml'  
        ) ? 
        this.setState({ imgdata: "" }) :
        this.setState({ imgdata: file })
    }

    handleSubmit(e) {
        e.preventDefault();

        if (!this.state.location || !this.state.imgdata ) 
        {   
            return this.setState({
                isError: true 
            });
        }

        this.props.fetchLastInstock();
 
        const lastInStockId = this.props.lastId.lastInStock[0];
        const newId = lastInStockId.id + 1; 

        let i = this.props.item;           

        const item_id = i._id; 
        const location = this.state.location;
        //const updateddate = new Date().toISOString();
        //const updatedyuser = this.props.auth.user.name;
        const imgdata = this.state.imgdata;

        const formData = new FormData();

        formData.append('item_id', item_id); 
        formData.append('id', newId); 
        formData.append('location', location); 
        //formData.append('deliverydate', deliverydate); 
        //formData.append('deliveryuser', deliveryuser); 
        formData.append('imgdata', imgdata); 

        this.props.addInStock(formData);

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
                        <h5 className="text-info">{i.index}</h5>
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="quantity">Quantity: </Label>
                                <Input type="text" name="quantity" id="quantity" 
                                    value={this.state.quantity} onChange={this.onChangeQuantity}
                                    invalid={this.state.isError && !this.state.quantity}
                                />
                                {(this.state.isError && !this.state.quantity) ? (
                                    <div>
                                        <p className="text-danger">Quantity is required.</p>
                                    </div>    
                                ) : ( <div /> )}            
                            </FormGroup>
                            <FormGroup>
                                <Label for="aliquot">Aliquot: </Label>
                                <Input type="text" name="aliquot" id="aliquot" 
                                    value={this.state.aliquot} onChange={this.onChangeAliquot}
                                    invalid={this.state.isError && !this.state.aliquot}
                                />
                                {(this.state.isError && !this.state.aliquot) ? (
                                    <div>
                                        <p className="text-danger">Aliquot is required.</p>
                                    </div>    
                                ) : ( <div /> )}            
                            </FormGroup>
                            <FormGroup>
                                <Label for="location">Location: </Label>
                                <Input type="text" name="location" id="location" 
                                    value={this.state.location} onChange={this.onChangeLocation}
                                    invalid={this.state.isError && !this.state.location}
                                />
                                {(this.state.isError && !this.state.location) ? (
                                    <div>
                                        <p className="text-danger">Location is required.</p>
                                    </div>    
                                ) : ( <div /> )}            
                            </FormGroup>    
                            <FormGroup>
                                <Label for="imgdata">Upload evidence of location: </Label>
                                <Input type="file" name="imgdata" id="imgdata" 
                                    onChange={this.onFileChange} 
                                />
                                {(this.state.isError && !this.state.imgdata) ? (
                                    <div>
                                        <p className="text-danger">Photo is required.</p>
                                    </div>    
                                ) : ( <div /> )}
                            </FormGroup>
                            <FormGroup>
                                <Label for="stocknotes">Additional notes: </Label>
                                <Input type="text" name="stocknotes" id="stocknotes" 
                                    value={this.state.stocknotes} onChange={this.onChangeStocknotes}
                                    invalid={this.state.isError && !this.state.stocknotes}
                                />
                                {(this.state.isError && !this.state.stocknotes) ? (
                                    <div>
                                        <p className="text-danger">Additional notes are required.</p>
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