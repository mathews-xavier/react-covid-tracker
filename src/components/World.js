import React,{Component} from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

class World extends Component{

    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        axios.get('https://corona.lmao.ninja/v2/countries').then((response) => {
            this.setState({ data: response.data })
        });
    }

     render(){
         return(
             <div className="row">
                 <div className="col-md-12">
                     <h3>World</h3>
                 </div>
                <div className="col-md-12">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <td>Country</td>
                                <td>Total Cases</td>
                                <td>Recovered</td>
                                <td>Deaths</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.data.map((itm,k)=>{
                                    return(
                                        <tr>
                                            <td>{itm.country}<img style={{width:'64px',marginLeft:'10px'}}src={itm.countryInfo.flag} /></td>
                                            <td>{itm.cases}</td>
                                            <td>{itm.recovered}</td>
                                            <td>{itm.deaths}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
             </div>
         )
     }
}

export default World;