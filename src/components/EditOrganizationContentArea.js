import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Col, FormGroup, Label, Input, Form, Button} from 'reactstrap';

import {apiGetCall} from '../api';
import {setInRoute} from '../utils/routeshelper';
import { defaultLang } from '../utils/generalhelper';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class EditOrganizationContentArea extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            _id: this.props.match.params._id,
            realm: '',
            date: '',
            name: '',
            country: '',
            type: '',
            language: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.logChange = this.logChange.bind(this);
        this.logChangeTime = this.logChangeTime.bind(this);
    }


    handleChange = (e, { name, value }) => { this.setState({ [name]: value }); }

    handleSubmit(event) {
        event.preventDefault();
    	let apiOrganization = apiGetCall(
            'update-organization', {}
        );

        axios.put(apiOrganization, {
            _id: this.state._id,
            realm: this.state.realm,
            date: moment(this.state.date).format('YYYY-MM-DD'),
            name: this.state.name,
            country: this.state.country,
            type: this.state.type,
            language: this.state.language
        })
        .then(response => {
            if(response.data.success==="true"){
                toast("Organization updated successfully");
                let lang = this.props.match.params.lang || defaultLang().langUI ;
                this.props.history.push(setInRoute('list_organization',{lang:lang}));
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

    logChangeTime(date) {
        this.setState({
          date: date
        });
    }

    componentDidMount() {
        
        let apiOrganization = apiGetCall(
            'get-organization', {_id:this.props.match.params._id}
        );
        
        axios.get(apiOrganization, {
        }) 
        .then(response => {
            this.setState({realm: response.data.data.realm, date: response.data.data.date, name: response.data.data.name,
            country: response.data.data.country, type: response.data.data.type, language: response.data.data.language});
        })
        .catch(function(error) {
            console.log('There is some error' + error);
        }); 

    }


    render() {
        let lang = this.props.match.params.lang || defaultLang().langUI ;
        let dateComponent = this.state.date.split('-');
        return (
            <div className="container-fluid">
                <ToastContainer />
            	<div>
                    <div className="row col-12"><div className="col-9"><h6>Edit Organization</h6></div><div className="col-3"><NavLink to={setInRoute('list_organization',{lang:lang})}>Back</NavLink></div></div>
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
                                    <DatePicker className="form-control" selected={moment(new Date(dateComponent[0],dateComponent[1], dateComponent[2]))} onChange={this.logChangeTime} placeholder="Date"/>
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
                                    <Input type="select" name="type" onChange={this.logChange}>
                                        <option value="Government Agency">Government Agency</option>
                                        <option value="Government Ministry">Government Ministry</option>
                                        <option value="Civil Society Organization">Civil Society Organization</option>
                                        <option value="Law Firm">Law Firm</option>
                                        <option value="Academic Institution">Academic Institution</option>
                                        <option value="Private Entity">Private Entity</option>
                                    </Input>
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

export default EditOrganizationContentArea;