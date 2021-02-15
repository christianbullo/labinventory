import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody} from "reactstrap";
import { LocalForm, Control, Errors } from 'react-redux-form';

import { editStock, fetchInStock } from "../actions/ActionCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//const required = val => val && val.length; 
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
    editStock: (instock) => (editStock(instock)),
    fetchInStock: () => (fetchInStock())
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

    handleSubmit(values) {
        values.preventDefault();

        if ((this.state.location && !this.state.imgdata ) || 
            (!this.state.location && this.state.imgdata )) 
        {   
            return this.setState({
                isError: true 
            });
        }

        let i = this.props.item;           

        const item_id = i._id; 
        const location = this.state.location;
        const updatelocdate = new Date().toISOString();
        const updatelocuser = this.props.auth.user.name;
        const imgdata = this.state.imgdata;

        const formData = new FormData();

        formData.append('item_id', item_id); 
        if (location && imgdata) {
            formData.append('location', location); 
            formData.append('imgdata', imgdata); 
            formData.append('updatelocdate', updatelocdate); 
            formData.append('updatelocuser', updatelocuser); 
        }

        const quantity = values.quantity;
        const updateqtydate = new Date().toISOString();
        const updateqtyuser = this.props.auth.user.name;
        if (quantity) {
            formData.append('quantity', quantity); 
            formData.append('updateqtydate', updateqtydate); 
            formData.append('updateqtyuser', updateqtyuser); 
        }

        const aliquot = values.aliquot;
        const updatealiqdate = new Date().toISOString();
        const updatealiquser = this.props.auth.user.name;
        if (aliquot) {
            formData.append('aliquot', aliquot); 
            formData.append('updatealiqdate', updatealiqdate); 
            formData.append('updatealiquser', updatealiquser); 
        }

        const stocknotes = values.stocknotes;
        const updatenotedate = new Date().toISOString();
        const updatenoteuser = this.props.auth.user.name;
        if (stocknotes) {
            formData.append('stocknotes', stocknotes); 
            formData.append('updatenotedate', updatenotedate); 
            formData.append('updatenoteuser', updatenoteuser); 
        }
        
        if (location && imgdata) {
            this.props.editStockloc(formData);
        }

        this.props.editStock(formData);

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
                        <LocalForm onSubmit={ (values) => this.handleSubmit(values) }>
                            <div className="form-group">
                                <Label htmlFor="quantity">New quantity: </Label>
                                <Control.text className="form-control" model=".quantity" id="quantity" name="quantity" 
                                    validators={{
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
                                        minLength: 'Must be at least 1',
                                        maxLength: 'Must be 30 characters or less',
                                        isNumber: 'Must be a number',
                                        isZero: 'Must be a valid quantity | In case of zero, set as out of stock'
                                    }}
                                /> 
                            </div>
                            
                            <div className="form-group">
                                <Label htmlFor="aliquot">Aliquot</Label>
                                <Control.text className="form-control" model=".aliquot" id="aliquot" name="aliquot" 
                                    validators={{
                                            minLength: minLength(2),
                                            maxLength: maxLength(100)
                                        }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".aliquot"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        minLength: 'Must be at least 2 characters',
                                        maxLength: 'Must be 100 characters or less'
                                    }}
                                /> 
                            </div>
                            <div className="form-group">
                                <Label htmlFor="stocknotes">Additional notes: </Label>
                                <Control.text className="form-control" model=".stocknotes" id="stocknotes" name="stocknotes" 
                                    validators={{
                                            minLength: minLength(2),
                                            maxLength: maxLength(100)
                                        }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".stocknotes"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        minLength: 'Must be at least 2 characters',
                                        maxLength: 'Must be 100 characters or less'
                                    }}
                                /> 
                            </div>
                            
                            <div className="form-group">
                                <Label for="location">Location: </Label>
                                <Input type="text" name="location" id="location" 
                                    value={this.state.location} onChange={this.onChangeLocation}
                                    invalid={this.state.isError && !this.state.location}
                                />
                                {(this.state.isError && !this.state.location && this.state.imgdata) ? (
                                    <div>
                                        <p className="text-danger">Location description is required.</p>
                                    </div>    
                                ) : ( <div /> )}    
                            </div>
                            <div className="form-group">
                                <Label htmlFor="imgdata">Upload evidence of location: </Label>
                                <Input type="file" name="imgdata" id="imgdata" 
                                    onChange={this.onFileChange} 
                                />
                                {(this.state.isError && this.state.imgdata && !this.state.imgdata) ? (
                                    <div>
                                        <p className="text-danger">Photo of location is required.</p>
                                    </div>    
                                ) : ( <div /> )}
                                <Errors
                                    className="text-danger"
                                    model=".imgdata"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be at least 2 characters',
                                        maxLength: 'Must be 100 characters or less'
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditStockForm));