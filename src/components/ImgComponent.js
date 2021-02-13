import React, { Component } from "react";
import { Button } from "reactstrap";

export default class ImgComponent extends Component {
  
    constructor(props) {
        super(props);
        
        this.triggerPhoto = this.triggerPhoto.bind(this);
        this.showFile = this.showFile.bind(this);
    };

    showFile(blob){
        // It is necessary to create a new blob object with mime-type explicitly set
        // otherwise only Chrome works like it should
        var newBlob = new Blob([blob], {type: "image/jpeg"})
      
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
        link.target='_blank';
        //link.download=filename;
        link.click();
        setTimeout(function(){
          // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(data);
        }, 100);
        window.open(data);
    }

    triggerPhoto() {
        const item = this.props.item;   
        const url = `/api/files/${item.imgname}`;

        fetch(url)
        .then(response => response.blob())
        .then(blob => this.showFile(blob));
    } 

    render() {
        return (
            <div>
                <Button outline onClick={this.triggerPhoto}>
                    <i className="fa fa-camera" />
                </Button>
            </div>
        );
    }
}
