import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody} from "reactstrap";

import { fetchOrders, addInStock, deleteOrder } from "../actions/ActionCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        orders: state.orders 
    };
};

const mapDispatchToProps = {
    addInStock: (instock) => (addInStock(instock)),
    deleteOrder: (oldorder) => (deleteOrder(oldorder)),
    fetchOrders: (pageData) => (fetchOrders(pageData))
};

class DeliveredForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            isError: false, 
            lastRequest: [],
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

    componentDidUpdate(prevProps, prevState) {
        if ((prevState.lastRequest === this.state.lastRequest) || (this.state.lastRequest === [])) {
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

        const lastId = this.state.lastRequest[0];
        const newId = lastId.id + 1;

        let o = this.props.order;           

        const item_id = o._id; 
        const location = this.state.location;
        const deliverydate = new Date().toISOString();
        const deliveryuser = this.props.auth.user.name;
        const imgdata = this.state.imgdata;

        const formData = new FormData();

        formData.append('item_id', item_id); 
        formData.append('id', newId); 
        formData.append('location', location); 
        formData.append('deliverydate', deliverydate); 
        formData.append('deliveryuser', deliveryuser); 
        formData.append('imgdata', imgdata); 

        this.props.addInStock(formData);

        this.props.deleteOrder(item_id);

        const length = this.props.length;
        if ((length === 1) && (this.props.orders.pages > 1)) {
            const newPage = this.props.orders.pages - 1;
            this.props.fetchOrders(newPage);
        } 
        else {
            const actualPage = this.props.orders.page;
            this.props.fetchOrders(actualPage);
        }
        
        this.toggleModal();

    }

    render() {
        let o = this.props.order;

        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="text-info">Delivered</span> 
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Delivery confirmation of:
                        <hr/>
                        <h4 className="text-primary">{o.tracking}</h4>
                        <h5 className="text-info">{o.article}</h5>
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="location">Location: </Label>
                                <Input type="text" name="location" id="location" 
                                    value={this.state.location} onChange={this.onChangeLocation}
                                    invalid={this.state.isError && !this.state.location}
                                />
                                {(this.state.isError && !this.state.location) ? (
                                    <div>
                                        <p className="text-danger">Location description is required.</p>
                                    </div>    
                                ) : ( <div /> )}            
                            </FormGroup>    
                            <FormGroup>
                                <Label for="imgdata">Upload photo as evidence of location: </Label>
                                <Input type="file" name="imgdata" id="imgdata" 
                                    onChange={this.onFileChange} 
                                />
                                {(this.state.isError && !this.state.imgdata) ? (
                                    <div>
                                        <p className="text-danger">Photo of location is required.</p>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeliveredForm));