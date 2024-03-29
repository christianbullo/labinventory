import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody} from "reactstrap";

import { addOrder, deleteRequest, fetchRequests } from "../actions/ActionCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return { 
        requests: state.requests
    };
};

const mapDispatchToProps = {
    fetchRequests: (pageData) => (fetchRequests(pageData)),
    addOrder: (order) => (addOrder(order)),
    deleteRequest: (oldrequest) => (deleteRequest(oldrequest))
};

class PurchaseForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            isError: false, 
            lastRequest: [],
            pdfdata: "",
            tracking: ""
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.onTrackingChange = this.onTrackingChange.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            isError: false, 
            lastRequest: [],
            pdfdata: "",
            tracking: ""
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if ((prevState.lastRequest === this.state.lastRequest) || (this.state.lastRequest === [])) {
            this.fetchLastOrder();
        }
    }

    fetchLastOrder() {
        const url = `/api/stock/orders/lastorder`;

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

    onTrackingChange(e) {
        e.preventDefault();
        const tracking = e.target.value; 

        (tracking.length !== 0) ?
        this.setState({ tracking: tracking }) : 
        this.setState({ tracking: "" }) 
    }

    onFileChange(e) {
        e.preventDefault();
        const file = e.target.files[0];
        
        (!file || file.type !== 'application/pdf') ? 
        this.setState({ pdfdata: "" }) :
        this.setState({ pdfdata: file })
    }

    handleSubmit(e) {
        e.preventDefault();

        if (!this.state.tracking || !this.state.pdfdata ) 
        {   
            return this.setState({
                isError: true 
            });
        }
        
        const lastId = this.state.lastRequest[0];
        const newId = lastId.id + 1; 

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

        this.props.addOrder(formData);

        this.props.deleteRequest(item_id);

        const length = this.props.length;
        if ((length === 1) && (this.props.requests.pages > 1)) {
            const newPage = this.props.requests.pages - 1;
            this.props.fetchRequests(newPage);
        }
        // else {
        //     const actualPage = this.props.requests.page;
        //     this.props.fetchRequests(actualPage);
        // }

        this.toggleModal();

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
                                    invalid={this.state.isError && !this.state.tracking}
                                />
                                {(this.state.isError && !this.state.tracking) ? (
                                    <div>
                                        <p className="text-danger">Traking number is required.</p>
                                    </div>    
                                ) : ( <div /> )}            
                            </FormGroup>    
                            <FormGroup>
                                <Label for="pdfdata">Choose the Internal Order Form to upload: </Label>
                                <Input type="file" name="pdfdata" id="pdfdata" 
                                    onChange={this.onFileChange} 
                                />
                                {(this.state.isError && !this.state.pdfdata) ? (
                                    <div>
                                        <p className="text-danger">PDF file is required.</p>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PurchaseForm));