import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody} from "reactstrap";

import { fetchInStock, saveItem } from "../actions/ActionCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const isNumber = val => !isNaN(+val); 
const isZero = val => val && (+val > 0);

const mapStateToProps = state => {
    return { 
        instock: state.instock 
    };
};

const mapDispatchToProps = {
    saveItem: (instock) => (saveItem(instock)),
    fetchInStock: (pageData) => (fetchInStock(pageData))
};

class InStockForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            isError: false, 
            article: "",
            type: "",
            index: "",
            quantity: "",
            unitcost: "",
            unitsize: "",
            vendor: "",
            contact: "",
            lastRequest: []
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.fetchLastInstock = this.fetchLastInstock.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 

        this.onChangeArticle = this.onChangeArticle.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeIndex = this.onChangeIndex.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeUnitcost = this.onChangeUnitcost.bind(this);
        this.onChangeUnitsize = this.onChangeUnitsize.bind(this);
        this.onChangeVendor = this.onChangeVendor.bind(this);
        this.onChangeContact = this.onChangeContact.bind(this);
    }
    
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            isError: false, 
            article: "",
            typeofarticle: "",
            index: "",
            quantity: "",
            unitcost: "",
            unitsize: "",
            vendor: "",
            contact: ""
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.isModalOpen === false && this.state.isModalOpen === true) {
            this.fetchLastInstock();
        }
    }

    fetchLastInstock() {
        const url = `/api/stock/instock/lastinstock`;

        async function findLastItem() {
            const response = await fetch(url);
            const lastItem = await response.json();
            return lastItem;    
        } 

        findLastItem().then(item => {
            this.setState({
                lastRequest: item 
            });
        });
    } 

    onChangeArticle(e) {
        e.preventDefault();
        const article = e.target.value; 

        (article.length !== 0) ?
        this.setState({ article: article }) : 
        this.setState({ article: "" }) 
    }

    onChangeType(e) {
        e.preventDefault();
        const typeofarticle = e.target.value; 

        (typeofarticle.length !== 0) ?
        this.setState({ typeofarticle: typeofarticle }) : 
        this.setState({ typeofarticle: "" }) 
    }

    onChangeIndex(e) {
        e.preventDefault();
        const index = e.target.value; 

        (index.length !== 0) ?
        this.setState({ index: index }) : 
        this.setState({ index: "" }) 
    }

    onChangeQuantity(e) {
        e.preventDefault();
        const quantity = e.target.value; 
        (isZero(quantity)) ?
        // (quantity !== 0) ?
        this.setState({ quantity: quantity }) : 
        this.setState({ quantity: "" }) 
    }

    onChangeUnitcost(e) {
        e.preventDefault();
        const unitcost = e.target.value; 
        (isZero(unitcost)) ?
        // (unitcost.length !== 0) ?
        this.setState({ unitcost: unitcost }) : 
        this.setState({ unitcost: "" }) 
    }

    onChangeUnitsize(e) {
        e.preventDefault();
        const unitsize = e.target.value; 

        (unitsize.length !== 0) ?
        this.setState({ unitsize: unitsize }) : 
        this.setState({ unitsize: "" }) 
    }

    onChangeVendor(e) {
        e.preventDefault();
        const vendor = e.target.value; 

        (vendor.length !== 0) ?
        this.setState({ vendor: vendor }) : 
        this.setState({ vendor: "" }) 
    }

    onChangeContact(e) {
        e.preventDefault();
        const contact = e.target.value; 

        (contact.length !== 0) ?
        this.setState({ contact: contact }) : 
        this.setState({ contact: "" }) 
    }

    handleSubmit(e) {
        e.preventDefault();

        if (!this.state.article || !this.state.typeofarticle || !this.state.index 
            || !this.state.quantity || !this.state.unitcost || !this.state.unitsize)
        {   
            return this.setState({
                isError: true 
            });
        }

        const lastId = this.state.lastRequest[0];
        const newId = lastId.id + 1; 
    
        const newRequest = {
            id: newId,  
            //...values,
            article: this.state.article,
            typeofarticle: this.state.typeofarticle, 
            index: this.state.index, 
            quantity: this.state.quantity,
            unitcost: this.state.unitcost,
            unitsize: this.state.unitsize, 
            vendor: this.state.vendor, 
            contact: this.state.contact, 
            registrationdate: new Date().toISOString(),
            registrationuser: this.props.auth.user.name
        };

        this.props.saveItem(newRequest);

        const actualPage = this.props.instock.page;
        this.props.fetchInStock(actualPage);

        this.toggleModal();

    }

    render() {

        return(
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="text-info">Add an existing item</span> 
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        <h4 className="text-primary">Add an existing item</h4>
                    </ModalHeader>
                    <ModalBody>
                        <h5 className="text-info">Mandatory Fields</h5>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="article">Article: </Label>
                                <Input type="text" name="article" id="article" 
                                    value={this.state.location} onChange={this.onChangeArticle}
                                    invalid={this.state.isError && !this.state.article}
                                />
                                {(this.state.isError && !this.state.article) ? (
                                    <div>
                                        <p className="text-danger">Article description is required.</p>
                                    </div>    
                                ) : ( <div /> )}            
                            </FormGroup>    
                            <FormGroup>
                                <Label for="index">Index: </Label>
                                <Input type="text" name="index" id="index" 
                                    value={this.state.index} onChange={this.onChangeIndex}
                                    invalid={this.state.isError && !this.state.index}
                                />
                                {(this.state.isError && !this.state.index) ? (
                                    <div>
                                        <p className="text-danger">Index is required.</p>
                                    </div>    
                                ) : ( <div /> )}            
                            </FormGroup>     
                            <div className="row">
                                <div className="col-sm-6">
                                    <FormGroup>
                                        <Label for="quantity">Quantity: </Label>
                                        <Input type="number" name="quantity" id="quantity" 
                                            value={this.state.quantity} onChange={this.onChangeQuantity}
                                            invalid={this.state.isError && !this.state.quantity}
                                        />
                                        {(this.state.isError && !this.state.quantity) ? (
                                            <div>
                                                <p className="text-danger">Quantity is required.</p>
                                            </div>    
                                        ) : ( <div /> )}            
                                    </FormGroup> 
                                </div>
                                <div className="col-sm-6">
                                    <FormGroup>
                                        <Label for="unitcost">Unit Cost: </Label>
                                        <Input type="number" name="unitcost" id="unitcost" 
                                            value={this.state.unitcost} 
                                            onChange={this.onChangeUnitcost}
                                            placeholder="$"
                                            invalid={this.state.isError && !this.state.unitcost}
                                        />    
                                        {(this.state.isError && !this.state.unitcost) ? (
                                            <div>
                                                <p className="text-danger">Unit Cost is required.</p>
                                            </div>    
                                        ) : ( <div /> )}            
                                    </FormGroup>
                                </div>
                            </div> 
                            <div className="row">
                                <div className="col-sm-6">
                                    <FormGroup>
                                        <Label for="unitsize">Unit Size: </Label>
                                        <Input type="text" name="unitsize" id="unitsize"
                                            onChange={this.onChangeUnitsize}
                                            invalid={this.state.isError && !this.state.unitsize}
                                        />
                                        {(this.state.isError && !this.state.unitsize) ? (
                                            <div>
                                                <p className="text-danger">Unit size is required.</p>
                                            </div>    
                                        ) : ( <div /> )}            
                                    </FormGroup>
                                </div>
                                <div className="col-sm-6">
                                    <FormGroup>
                                        <Label for="typeofarticle">Type of Article: </Label>
                                        <Input type="select" name="typeofarticle" id="typeofarticle"
                                            onChange={this.onChangeType}
                                            invalid={this.state.isError && this.state.typeofarticle === ""}
                                        >    
                                            <option value="">Select</option>
                                            <option value="reagents">Reagents</option>
                                            <option value="animal">Animal Facilities</option>
                                            <option value="consumables">General Consumables</option>
                                            <option value="microscope">Microscope Accessories</option>
                                        </Input>
                                        {(this.state.isError && !this.state.typeofarticle) ? (
                                            <div>
                                                <p className="text-danger">Type of Article is required.</p>
                                            </div>    
                                        ) : ( <div /> )}            
                                    </FormGroup>
                                </div>
                            </div>  
                            <br/>
                            <h5 className="text-info">Optional Fields</h5>
                            <FormGroup>
                                <Label for="vendor">Vendor: </Label>
                                <Input type="text" name="vendor" id="vendor" 
                                    value={this.state.vendor} onChange={this.onChangeVendor}
                                />
                            </FormGroup> 
                            <FormGroup>
                                <Label for="contact">Contact: </Label>
                                <Input type="text" name="contact" id="contact" 
                                    value={this.state.contact} onChange={this.onChangeContact}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InStockForm));