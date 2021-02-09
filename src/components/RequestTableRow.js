import React, { Component } from "react";
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Button, Label, Modal, ModalHeader, ModalBody} from "reactstrap";

import { fetchLastOrder, addOrder, deleteRequest } from "../actions/ActionCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

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

class RequestTableRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false 
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
        this.props.fetchLastOrder();
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.props.fetchLastOrder();
 
        const lastOrderId = this.props.lastId.lastOrder[0];
        const newId = lastOrderId.id + 1; 
 
        const newOrder = {
            id: newId,  
            //category: "request",
            ...values,
            orderdate: new Date().toISOString(),
            orderuser: this.props.auth.user.name
        };

        this.props.addOrder(newOrder);

        this.props.deleteRequest(values.item_id);

        this.toggleModal();

        alert('Current state is: ' + JSON.stringify(newOrder) );
    }

    render() {
        let r = this.props.request;

        return(
            <tr>
                <td> {r.id} </td>
                <td> {r.article} </td>
                <td> {r.quantity} </td>
                <td> {r.unitcost} </td>
                <td> {r.requestdate} </td>
                <td> {r.requestuser} </td>
                <td>
                    {/* <button className="btn btn-light m-1" 
                        onClick={ () => {
                            //this.props.addOrder(r);
                            //this.props.deleteRequest(r);
                            alert(`The product: \n${r.catalog} / ${r.product},\nhas been ordered.\nPlease check on the page "Incoming Orders".`);
                        }  
                    }>
                        <p className="text-danger">Set as purchased</p>
                    </button> */}

                    <Button outline onClick={this.toggleModal}>
                        <span className="text-info">Purchased</span> 
                    </Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>
                            <h5>Purchase confirmation of the item {r.id}: </h5>
                            <hr/>
                            <h4 className="text-info">{r.article}</h4>
                        </ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={ (values) => {
                                const r_id = this.props.request._id;
                                const formData = {
                                    ...values,
                                    item_id: r_id 
                                };
                                this.handleSubmit(formData);
                            } }>
                                <div className="form-group">
                                    <Label htmlFor="tracking">Tracking number: </Label>
                                    <Control.text className="form-control" model=".tracking" id="tracking" name="tracking" 
                                        // validators={{
                                        //         required,
                                        //         minLength: minLength(2),
                                        //         maxLength: maxLength(100)
                                        //     }}
                                    />
                                    {/* <Errors
                                        className="text-danger"
                                        model=".article"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 100 characters or less'
                                        }}
                                    />  */}
                                </div>
                                <div className="form-group">
                                    <Label htmlFor="index">Index number:</Label>
                                    <Control.text className="form-control" model=".index" id="index" name="index" 
                                        // validators={{
                                        //         required,
                                        //         minLength: minLength(2),
                                        //         maxLength: maxLength(30),
                                        //         isNumber
                                        //     }}
                                    />
                                    {/* <Errors
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
                                    />  */}
                                </div>
                                <br/>
                                <Button type="submit" color="primary">Purchased</Button> 
                            </LocalForm>
                        </ModalBody>
                    </Modal>

                </td>
            </tr>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RequestTableRow));