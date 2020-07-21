import React, { Component } from 'react';
import axios from 'axios';
import { Card, Accordion, Button,Table } from 'react-bootstrap';

class State extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stateData: {}
        }
    }

    componentDidMount() {
        axios.get('https://api.covid19india.org/state_district_wise.json').then((response) => {
            this.setState({ stateData: response.data })
        });
    }

    render() {

        let keys = Object.keys(this.state.stateData); // since the values are objects we need to change the keys into array


        return (
            <div className="col-md-12">
                <Accordion>
                    {
                        keys.map((itm,k)=>{
                            let districts = this.state.stateData[itm].districtData;
                            let districtKeys = Object.keys(districts);

                            let totalActive = 0;
                            let totalConfirmed = 0;
                            let totalDeaths = 0;
                            let totalRecovered = 0;

                            let districtList = [];
                            for(let x in districts){
                                totalActive += districts[x].active;
                                totalConfirmed += districts[x].confirmed;
                                totalDeaths += districts[x].deceased;
                                totalRecovered += districts[x].recovered;
                                let ob = districts[x];
                                ob["districtName"] = x;
                                districtList.push(ob);
                            }

                            return(
                                <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="primary" eventKey={k}>
                                        {itm} - <span className="btn-dark p-1 mr-2">Total Cases - {totalConfirmed} </span><span className="btn-dark p-1 mr-2">Active {totalActive}</span> <span className="btn-dark p-1 mr-2">Deaths {totalDeaths}</span><span className="btn-dark p-1 mr-2"> Recovered {totalRecovered}</span>
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={k}>
                                    <Card.Body>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <td>
                                                    District
                                                    </td>
                                                    <td>
                                                    Confirmed
                                                    </td>
                                                    <td>
                                                    Active
                                                    </td>
                                                    <td>
                                                    Recovered
                                                    </td>
                                                    <td>
                                                    Deaths
                                                    </td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    districtList.map((itm,k)=>{

                                                        return(
                                                            <tr>
                                                                <td>{itm.districtName}</td>
                                                                <td>{itm.confirmed}</td>
                                                                <td>{itm.active}</td>
                                                                <td>{itm.recovered}</td>
                                                                <td>{itm.deceased}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            )
                        })
                    }
                   
                </Accordion>
            </div>

        )
    }
}

export default State;