import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Col, FormGroup, Label, Input, Form, Button} from 'reactstrap';

import {apiGetCall} from '../api';
import {setInRoute} from '../utils/routeshelper';
import { defaultLang } from '../utils/generalhelper';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import { getLangs } from "../utils/i18nhelper";
import Select from 'react-select';

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
        this.logChangeTime = this.logChangeTime.bind(this);
        this.logChangeType = this.logChangeType.bind(this);
        this.logChangeLanguage = this.logChangeLanguage.bind(this);
        this.logChange = this.logChange.bind(this);
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

    logChangeLanguage(e) {
        this.setState({
          language: e.value
        });
    }

    logChangeType(e) {
        this.setState({
          type: e.value
        });
    }

    logChangeTime(date) {
        console.log(moment(date).format('DD-MM-YYYY'));
        this.setState({
          date: date
        });
    }

    logChange(e) {
        this.setState({[e.target.name]: e.target.value});  
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
        let allLangs = getLangs();
        let langArray = [];
        for(let i=0; i<allLangs.length;i++){
            langArray.push({value:allLangs[i].content, label:allLangs[i].content});
        }

        let allTypes = ['Government Agency','Government Ministry','Civil Society Organization','Law Firm','Academic Institution','Private Entity'];
        
        let typeArray = [];
        for(let i=0; i<allTypes.length;i++){
            typeArray.push({value:allTypes[i], label:allTypes[i]});
        }

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
                                    <Select
                                        name="type"
                                        value={this.state.type}
                                        onChange={this.logChangeType}
                                        options={typeArray}
                                      />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="label" sm={2}>Language</Label>
                                <Col sm={10}>
                                    <Select
                                        name="language"
                                        value={this.state.language}
                                        onChange={this.logChangeLanguage}
                                        options={langArray}
                                      />
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