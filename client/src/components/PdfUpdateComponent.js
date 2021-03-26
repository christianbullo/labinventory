import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody} from "reactstrap";

import axios from "axios";

import { fetchInStock, fetchOutStock } from "../actions/ActionCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return { 
        instock: state.instock,
        outstock: state.outstock  
    };
};

const mapDispatchToProps = {
    fetchInStock: (pageData) => (fetchInStock(pageData)),
    fetchOutStock: (pageData) => (fetchOutStock(pageData))
};

class PdfUpdateComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            isError: false, 
            pdfdata: ""
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.onFileChange = this.onFileChange.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen,
            isError: false, 
            pdfdata: "" 
        });
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

        if (!this.state.pdfdata ) 
        {   
            return this.setState({
                isError: true 
            });
        }

        let i = this.props.item;           

        const item_id = i._id; 
        const pdfdata = this.state.pdfdata;

        const formData = new FormData();

        formData.append('item_id', item_id); 
        formData.append('pdfdata', pdfdata); 

        axios
            .post("/api/stock/instock/editstockpdf", formData)
            .then(response => {
                return response.data;
            })
            .catch(err =>
            {
                alert('errore in edit PDF!!!!! err = ' + err);
            }
        );
        
        if (i.category === 'instock') {
            const actualPage = this.props.instock.page;
            this.props.fetchInStock(actualPage);
        } else if (i.category === 'outofstock') {
            const actualPage = this.props.outstock.page;
            this.props.fetchOutStock(actualPage);  
        }
        
        this.toggleModal();
    }

    render() {
        let i = this.props.item; 

        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <i class="fa fa-plus-square text-warning"></i> 
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Upload the Internal Order Form of the item:
                        <hr/>
                        <h4 className="text-primary">{i.article}</h4>
                        <h5 className="text-info">{i.index}</h5>
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>    
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PdfUpdateComponent));