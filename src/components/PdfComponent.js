import React, { Component } from "react";
import { Button } from "reactstrap";
import { fetchFileOrder } from "../actions/ActionCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SinglePage from "./PdfSinglePage";

const mapStateToProps = state => {
    return { 
        files: state.files 
    };
};

const mapDispatchToProps = {
    fetchFileOrder: (pdfname) => (fetchFileOrder(pdfname))
};

class PdfComponent extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            //pdfstr: '',
            showPdf: false
        };
        //this.providePDF = this.providePDF.bind(this);
        this.triggerPDF = this.triggerPDF.bind(this);
        this.showFile = this.showFile.bind(this);
    };

    // componentDidMount() {
    //     let order = this.props.order;   

    //     this.props.fetchFileOrder(order.pdfname);
    // }

    // arrayBufferToBase64(buffer) {
    //     var binary = '';
    //     var bytes = [].slice.call(new Uint8Array(buffer));
    //     bytes.forEach((b) => binary += String.fromCharCode(b));
    //     return window.btoa(binary);
    // };

    // providePDF(data) {
    //     const order = this.props.order;
    //     //const base64Flag = 'data:application/pdf;base64,';
    //     //var pdfStr = this.arrayBufferToBase64(order.pdfdata);
    //     // this.setState({
    //     //     pdfstr: base64Flag + pdfStr
    //     // });
    //     this.setState({
    //         pdfstr: order.pdfdata
    //     });
    // }

    showFile(blob, filename){
        // It is necessary to create a new blob object with mime-type explicitly set
        // otherwise only Chrome works like it should
        var newBlob = new Blob([blob], {type: "application/pdf"})
      
        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlob
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
        } 
      
        // For other browsers: 
        // Create a link pointing to the ObjectURL containing the blob.
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement('a');
        link.href = data;
        //link.download="file.pdf";
        link.download=filename;
        link.click();
        setTimeout(function(){
          // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(data);
        }, 100);
    }

    triggerPDF() {
        const order = this.props.order;   
        //alert('order is ' + JSON.stringify(order));
        //const filename = "300bcddc0885bd657d228fafe573d891.jpg";
        //const url = "/api/files/" + filename;
        const prova = '300bcddc0885bd657d228fafe573d891.jpg';
        const url = `/api/files/${order.pdfname}`;

        // fetch([url to fetch], {[options setting custom http-headers]})
        // .then(r => r.blob())
        // .then(showFile);
        fetch(url)
        .then(response => response.blob())
        .then(blob => this.showFile(blob, order.pdfname));

        //this.props.fetchFileOrder(order.pdfname);

        //alert('this.state.files is ' + this.state.files);

        this.setState({
            showPdf: !this.state.showPdf
        });
    } 

    render() {

        // <SinglePage pdf={this.state.pdfstr} />

        return (
            <div>
                <Button outline onClick={this.triggerPDF}>
                    <i className="fa fa-file-pdf-o" />
                </Button>
                {
                    this.state.showPdf ? 
                    (   
                        <div>
                            OK OK OK 
                        </div>
                    ) 

                    : 

                    (<div/>)
                }
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PdfComponent));