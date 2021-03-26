import React, { Component } from "react";

import {Doughnut} from 'react-chartjs-2';

import axios from "axios";

export class StatsComponent extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            myData: [],
        }
        this.triggerQuery = this.triggerQuery.bind(this);
    }

    triggerQuery() {
        const url = `/api/expenses`;

        axios
        .get(`/api/expenses`)
        .then(response => {
            return response.data;
        })
        .then(data => {
            const entries = Object.keys(data);

            let totalAmount = 0; 
    
            for (let i = 0; i < entries.length; i++) {
                totalAmount = totalAmount + Number(Object.values(data)[i]);  
            }

            for (let i = 0; i < entries.length; i++) {
                                
                if (entries[i] === 'reagents') {
                    const actualAmount = Number(Object.values(data)[i]); 
                    let Percent = (Number(actualAmount.toFixed(2)) / Number(totalAmount.toFixed(2))) * 100; 
                    //let Percent = ((Math.round(actualAmount * 100) / 100) / (Math.round(totalAmount * 100) / 100) * 100); 
                    this.setState({
                        myData: this.state.myData.concat({
                            label: 'Reagents',
                            value:  Number(Percent.toFixed(2)) //Object.values(data)[i]
                        })
                    });
                }
                if (entries[i] === 'animal') {
                    const actualAmount = Number(Object.values(data)[i]); 
                    let Percent = (Number(actualAmount.toFixed(2)) / Number(totalAmount.toFixed(2))) * 100; 

                    this.setState({
                        myData: this.state.myData.concat({
                            label: 'Animal Facilities',
                            value:  Number(Percent.toFixed(2)) //Object.values(data)[i]
                        })
                    });
                }
                if (entries[i] === 'consumables') {
                    const actualAmount = Number(Object.values(data)[i]); 
                    let Percent = (Number(actualAmount.toFixed(2)) / Number(totalAmount.toFixed(2))) * 100; 

                    this.setState({
                        myData: this.state.myData.concat({
                            label: 'General Consumables',
                            value: Number(Percent.toFixed(2)) //Object.values(data)[i]
                        })
                    });
                }
                if (entries[i] === 'microscope') {
                    const actualAmount = Number(Object.values(data)[i]); 
                    let Percent = (Number(actualAmount.toFixed(2)) / Number(totalAmount.toFixed(2))) * 100; 

                    this.setState({
                        myData: this.state.myData.concat({
                            label: 'Microscope Accessories',
                            value:  Number(Percent.toFixed(2)) //Object.values(data)[i]
                        })
                    });
                }              
            }

            this.setState({
                chartData:{
                    labels: this.state.myData.map(d => d.label),
                    datasets:[
                        {
                        label:'Population',
                        data: this.state.myData.map(d => d.value),
                        backgroundColor: [
                            // 'rgba(255, 99, 132, 0.2)',
                            // 'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            // 'rgba(255, 99, 132, 1)',
                            // 'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                        }
                    ]
                }
            });
        })
        .catch(error => alert('error! ' + error));
    } 

    componentDidMount() {
        this.triggerQuery();
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row d-flex justify-content-center">
                    <div className="col"></div>
                    <div className="col-6 justify-content-center">
                        <h1>Total Expenditures Percentages</h1>
                    </div>
                    <div className="col"></div>
                </div>
                <div>
                    <br />
                    <hr />
                </div>
                <Doughnut data={this.state.chartData} />
                <div>
                    <br />
                    <br />
                </div>
            </div>
        )
    };
}
 

