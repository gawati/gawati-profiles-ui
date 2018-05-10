import React from 'react';
import axios from 'axios';
import { Col, FormGroup, Label, Input, Form, Button} from 'reactstrap';

import {apiGetCall} from '../api';
import { ToastContainer, toast } from 'react-toastify';

class AddOrganizationContentArea extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            realm: '',
            date: '',
            name: '',
            country: '',
            type: '',
            language: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.logChange = this.logChange.bind(this);
    }


    handleChange = (e, { name, value }) => { this.setState({ [name]: value }); }

    handleSubmit(event) {
        event.preventDefault();
    	let apiOrganization = apiGetCall(
            'organization', {}
        );

        axios.post(apiOrganization, {
            realm: this.state.realm,
            date: this.state.date,
            name: this.state.name,
            country: this.state.country,
            type: this.state.type,
            language: this.state.language
        })
        .then(response => {
            console.log(response);
            if(response.data.success==="true"){
                toast("Organization created successfully");
            }else{
                toast("There is some problem. Kindly try again");
            }
        })
        .catch(function(error) {
            console.log('There is some error' + error);
            toast("There is some problem. Kindly try again");
        }); 

    }

    logChange(e) {
        this.setState({[e.target.name]: e.target.value});  
    }


    render() {
        return (
            <div className="container-fluid">
                <ToastContainer />
            	<div>
                    <h2>Add Organization</h2>
                    <div className="container register-form">
                        <Form onSubmit={this.handleSubmit} method="POST">

                            <FormGroup row>
                                <Label for="label" sm={2}>Realm</Label>
                                <Col sm={10}>
                                    <Input type="text" value={this.state.realm}  name="realm" onChange={this.logChange} placeholder="Realm Name" autoFocus/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="label" sm={2}>Date</Label>
                                <Col sm={10}>
                                    <Input type="text" value={this.state.date}  name="date" onChange={this.logChange} placeholder="Date" autoFocus/>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label for="label" sm={2}>Name</Label>
                                <Col sm={10}>
                                    <Input type="text" value={this.state.name}  name="name" onChange={this.logChange} placeholder="Organization Name" autoFocus/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="label" sm={2}>Country</Label>
                                <Col sm={10}>
                                    <Input type="text" value={this.state.country}  name="country" onChange={this.logChange} placeholder="Country" autoFocus/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="label" sm={2}>Type</Label>
                                <Col sm={10}>
                                    <Input type="text" value={this.state.type}  name="type" onChange={this.logChange} placeholder="Type" autoFocus/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="label" sm={2}>Language</Label>
                                <Col sm={10}>
                                    <Input type="text" value={this.state.language}  name="language" onChange={this.logChange} placeholder="Language" autoFocus/>
                                </Col>
                            </FormGroup>
                            <div className="submit-section">
                                <div sm={2}></div>
                                <Button className="btn btn-uth-submit">Submit</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddOrganizationContentArea;