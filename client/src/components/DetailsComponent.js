import React, { Component } from "react";
import { Button, Card, CardText, CardBody, CardTitle, Modal, ModalHeader, ModalBody} from "reactstrap";
import Moment from "react-moment"; 
import ImgComponent from "./ImgComponent";

export default class DetailsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        let i = this.props.item;

        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-search" />  
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Details of item:
                        <hr/>
                        <h4 className="text-primary">{i.article}</h4>
                    </ModalHeader>
                    <ModalBody>
                        <Card>
                            <CardBody>
                                <CardText>
                                    <div className="row">
                                        <div className="col"><h5 className="text-info">Quantity:</h5></div>
                                        <div className="col-sm-8">{i.quantity}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col"><h5 className="text-info">Unit size:</h5></div>
                                        <div className="col-sm-9">{i.unitsize}</div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col text-info">Updated by:</div>
                                        <div className="col text-info">On:</div>
                                    </div>
                                    <div className="row">
                                        <div className="col">{i.updateqtyuser}</div>
                                        <div className="col">
                                            {i.updateqtydate ? (<Moment format="ll">{i.updateqtydate}</Moment>) : (<div/>)}
                                        </div>
                                    </div>
                                </CardText>
                            </CardBody>
                        </Card>
                        <br/>
                        <Card>
                            <CardBody>
                                <CardText>
                                    <div className="row">
                                        <div className="col"><h5 className="text-info">Location:</h5></div>
                                        {i.location ? (
                                            <React.Fragment>
                                                <div className="col-sm-6">{i.location}</div>
                                                <div className="col"><ImgComponent item={i} /></div>
                                            </React.Fragment>                                
                                        ) : (
                                            <div className="col-sm-8">
                                                <span className="text-warning"><i>(missing)</i></span> 
                                            </div>
                                        )}
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col text-info">Updated by:</div>
                                        <div className="col text-info">On:</div>
                                    </div>
                                    <div className="row">
                                        <div className="col">{i.updatelocuser}</div>
                                        <div className="col">
                                            {i.updatelocdate ? (<Moment format="ll">{i.updatelocdate}</Moment>) : (<div/>)}
                                        </div>
                                    </div>
                                </CardText>
                            </CardBody>
                        </Card>
                        <br/>
                        <Card>
                            <CardBody>
                                <CardText>
                                    <div className="row">
                                        <div className="col"><h5 className="text-info">Vendor:</h5></div>
                                        <div className="col-sm-9">{i.vendor}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col"><h5 className="text-info">Contact:</h5></div>
                                        <div className="col-sm-9">{i.contact}</div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col text-info">Updated by:</div>
                                        <div className="col text-info">On:</div>
                                    </div>
                                    <div className="row">
                                        <div className="col">{i.updatevendoruser}</div>
                                        <div className="col">
                                            {i.updatevendordate ? (<Moment format="ll">{i.updatevendordate}</Moment>) : (<div/>)}
                                        </div>
                                    </div>
                                </CardText>
                            </CardBody>
                        </Card>
                        <br/>
                        <Card>
                            <CardBody>
                                <CardText>
                                    <div className="row">
                                        <div className="col"><h5 className="text-info">Aliquot:</h5></div>
                                        <div className="col-sm-9">{i.aliquot}</div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col text-info">Updated by:</div>
                                        <div className="col text-info">On:</div>
                                    </div>
                                    <div className="row">
                                        <div className="col">{i.updatealiquser}</div>
                                        <div className="col">
                                            {i.updatealiqdate ? (<Moment format="ll">{i.updatealiqdate}</Moment>) : (<div/>)}
                                        </div>
                                    </div>
                                </CardText>
                            </CardBody>
                        </Card>
                        <br/>
                        <Card>
                            <CardBody>
                                <CardTitle><h5 className="text-info">Additional notes:</h5> {" "} {i.stocknotes}</CardTitle>
                                <CardText>
                                    <hr/>
                                    <div className="row">
                                        <div className="col text-info">Updated by:</div>
                                        <div className="col text-info">On:</div>
                                    </div>
                                    <div className="row">
                                        <div className="col">{i.updatenoteuser}</div>
                                        <div className="col">
                                            {i.updatenotedate ? (<Moment format="ll">{i.updatenotedate}</Moment>) : (<div/>)}
                                        </div>
                                    </div>
                                </CardText>
                            </CardBody>
                        </Card>
                        <br/>
                        {i.registrationdate ? 
                        ( 
                            <Card>
                                <CardBody>
                                    <CardTitle>
                                        <h5 className="text-info">
                                            Item already present and registered ex post. 
                                        </h5>
                                        <hr/>
                                    </CardTitle>
                                    <CardText>
                                        <div className="row">
                                            <div className="col text-info">Registered by:</div>
                                            <div className="col text-info">On:</div>
                                        </div>
                                        <div className="row">
                                            <div className="col">{i.registrationuser}</div>
                                            <div className="col">
                                                <Moment format="ll">{i.registrationdate}</Moment>
                                            </div>
                                        </div>
                                    </CardText>
                                </CardBody>
                            </Card>
                        )   
                        :
                        (<React.Fragment>
                            <Card>
                                <CardBody>
                                    <CardText>
                                        <div className="row">
                                            <div className="col text-info">Delivered by:</div>
                                            <div className="col text-info">On:</div>
                                        </div>
                                        <div className="row">
                                            <div className="col">{i.deliveryuser}</div>
                                            <div className="col">
                                                {i.deliverydate ? (<Moment format="ll">{i.deliverydate}</Moment>) : (<div/>)}
                                            </div>
                                        </div>
                                    </CardText>
                                </CardBody>
                            </Card>
                            <br/>
                            <Card>
                                <CardBody>
                                    <CardText>
                                        <div className="row">
                                            <div className="col text-info">Purchased by:</div>
                                            <div className="col text-info">On:</div>
                                        </div>
                                        <div className="row">
                                            <div className="col">{i.orderuser}</div>
                                            <div className="col">
                                                {i.orderdate ? (<Moment format="ll">{i.orderdate}</Moment>) : (<div/>)}
                                            </div>
                                        </div>
                                    </CardText>
                                </CardBody>
                            </Card>
                            <br/>
                            <Card>
                                <CardBody>
                                    <CardText>
                                        <div className="row">
                                            <div className="col text-info">Requested by:</div>
                                            <div className="col text-info">On:</div>
                                        </div>
                                        <div className="row">
                                            <div className="col">{i.requestuser}</div>
                                            <div className="col">
                                                {i.requestdate ? (<Moment format="ll">{i.requestdate}</Moment>) : (<div/>)}
                                            </div>
                                        </div>
                                    </CardText>
                                </CardBody>
                            </Card>
                        </React.Fragment>
                        )}
                        <br/>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
