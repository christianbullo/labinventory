import React, { Component } from "react";
import {  Button, Collapse, Card, CardBody, CardHeader, CardTitle, CardText } from "reactstrap";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { groupBy, forEach } from "lodash";
import { textData } from "./textData";

class Accordion extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { 
            collapseBanner: "", 
            collapseCycle: "", 
            collapseReleaseDate: "", 
            collapseLayout:"", 
            data:{} 
        };       
    }

    componentDidMount(){
        // call prepare data after api call
        this.prepareData(textData)
    }
      
    prepareData(data){
        
        let dataG1 = groupBy(data,(d=>{
            return d.banner_id
        }));
        
        let dataG2= {};
        
        forEach(dataG1,(value,key)=>{
            dataG2[key] = {};
            let g2 = groupBy(value, (d => {
                return d.cycle
            }))
        
            forEach(g2,(v2,k2)=>{
                let g3 = groupBy(v2, v3 => {
                    return  v3.subtitle
                })
                dataG2[key][k2] = g3 
            })
        })
        this.setState({data:dataG2});
        alert('keys are: ' + Object.keys(dataG2));
        alert('entries are: ' + JSON.stringify(Object.entries(dataG2)));
    }
    
    toggle(e) {
        let event = e.target.dataset.event;
        let key = e.target.dataset.type;
        switch(key){
            case "collapseBanner":{
                this.setState({ 
                    collapseBanner: event, 
                    collapseCycle: "", 
                    collapseReleaseDate: "", 
                    collapseLayout:""});
            break;
          }
            case "collapseCycle": {
                this.setState({ 
                    collapseCycle: event, 
                    collapseReleaseDate: "", 
                    collapseLayout: "" });
            break;
          }
            case "collapseReleaseDate": {
                this.setState({ 
                    collapseReleaseDate: event, 
                    collapseLayout: "" });
            break;
          }
            case "collapseLayout":{
                this.setState({ collapseLayout: event });
            break;
          }
          default: break;
        }
    }

    renderLayouts(layouts) {
        let result = [];
        forEach(layouts, (layout, index) => {
            result.push(
            <Card style={{ marginBottom: '1rem' }} key={layout}>
                <CardHeader 
                    onClick={this.toggle} 
                    data-event={layout.layout} 
                    data-type="collapseLayout"
                >
                    {layout.layout_name}
                </CardHeader>
                <Collapse isOpen={this.state.collapseLayout === layout.layout}>
                    <CardBody>
                        render release form {layout.layout_name}
                    </CardBody>
                </Collapse>
            </Card>
            )
        })
        return result;
    }

    renderRelease(releases) {
        let result = [];
        forEach(releases, (release, releaseDate) => {
            console.log(release);
            result.push(
                <Card style={{ marginBottom: '1rem' }} key={releaseDate}>
                    <CardHeader 
                        onClick={this.toggle} 
                        data-event={releaseDate} 
                        data-type="collapseReleaseDate"
                    >
                        {releaseDate}
                    </CardHeader>
                    <Collapse isOpen={this.state.collapseReleaseDate === releaseDate}>
                        <CardBody>
                            {this.renderLayouts(release)}
                        </CardBody>
                    </Collapse>
                </Card>
            )
        })
        return result;
    }

    renderCycles(cycles) {
        let result = [];
        forEach(cycles, (cycle, cycleId) => {
            result.push(
                <Card style={{ marginBottom: '1rem' }} key={cycleId}>
                    <CardHeader 
                        onClick={this.toggle} 
                        data-event={cycleId} 
                        data-type="collapseCycle"
                    >
                        {cycleId}
                    </CardHeader>
                    <Collapse isOpen={this.state.collapseCycle === cycleId}>
                        <CardBody>
                            {this.renderRelease(cycle)}
                        </CardBody>
                    </Collapse>
                </Card>
            )
        })
        return result;
      }
      renderBanner(){
        let result = [];
        forEach(this.state.data,(banners,bannerId)=>{
            result.push( 
                <Card style={{ marginBottom: '1rem' }} key={bannerId}>
                    <CardHeader 
                        onClick={this.toggle} 
                        data-event={bannerId} 
                        data-type="collapseBanner"
                        tag="h4"
                    >   
                        {bannerId} bla bla bla {" "}
                        {banners[bannerId]}
                    </CardHeader>
                    <Collapse isOpen={this.state.collapseBanner === bannerId}>
                        <CardBody>
                            {this.renderCycles(banners)}            
                        </CardBody>
                    </Collapse>
                </Card>
            )
        })
        return result;
      }
      render() {
        return (
            <div className="container">
                {/* <h3 className="page-header">Reactstrap Accordion using card component</h3> */}        
                {this.renderBanner()}         
            </div>
        );
    }
}

Accordion.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(Accordion);

