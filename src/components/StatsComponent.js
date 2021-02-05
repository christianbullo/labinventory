import React, { Component } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

export class StatsComponent extends Component {

    COLORS = ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"];

    pieData = [
        {
            "name": "ACME XYZ.n Polyclonal Antibody",
            "value": 38.85
        },
        {
            "name": "Histone H2C.y Polyclonal Antibody",
            "value": 17.91
        },
        {
            "name": "ACME ABC.w Fluo Marker",
            "value": 16.85
        },
        {
            "name": "Tungsten Carbide Beads, 3 mm (200)",
            "value": 16.14
        },
        {
            "name": "Others",
            "value": 10.25
        }
    ];

    CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc' }}>
                    <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
                </div>
            );
        }

        return null;
    };

    render() {
        return (
            <div className="container-fluid">
                <div className="row d-flex justify-content-center">
                    <div className="col"></div>
                    <div className="col-6 justify-content-center">
                        <h1>Stats on the inventory</h1>
                    </div>
                    <div className="col"></div>
                </div>
                <div>
                    <hr />
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col"></div>
                    <div className="col-6 justify-content-center">
                        <br />
                        <h2>Annual expenditures: </h2>
                        <br />
                    </div>
                    <div className="col"></div>
                </div>
                <div className="row">
                    <div className="col"></div>
                    <div className="col">
                        <PieChart width={730} height={300}>
                            <Pie data={this.pieData} color="#000000" dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" >
                                {
                                    this.pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={this.COLORS[index % this.COLORS.length]} />)
                                }
                            </Pie>
                            <Tooltip content={<this.CustomTooltip />} />
                            <Legend />
                        </PieChart>                        
                    </div>
                    <div className="col"></div>
                </div>
                <div>
                    <br />
                    <hr />
                </div>
                <div>
                    <br />
                    <br />
                    <br />
                </div>
            </div>
        )
    };
}
 

