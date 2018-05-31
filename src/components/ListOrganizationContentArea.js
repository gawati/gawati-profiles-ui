import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import {apiGetCall} from '../api';
import {setInRoute} from '../utils/routeshelper';
import { defaultLang } from '../utils/generalhelper';

class ListOrganizationContentArea extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            organization: []
        };
    }

    handleChange = (e, { name, value }) => { this.setState({ [name]: value }); }

    componentDidMount() {
        
    	let apiOrganization = apiGetCall(
            'list-organization', {}
        );
        
        axios.get(apiOrganization, {
        }) 
        .then(response => {
            this.setState({ organization: response.data.data});
        })
        .catch(function(error) {
            console.log('There is some error' + error);
        }); 

    }

    deleteOrganization(member){
        console.log(member);
        let data = {
            _id: member._id
        }

        let apiOrganization = apiGetCall(
            'delete-organization', {}
        );
        
        axios.delete(apiOrganization, {data
        }) 
        .then(response => {
            let organization = this.state.organization;
            let index = organization.indexOf(member);
            this.setState({
                organization: this.state.organization.filter((_, i) => i !== index)
            });
            toast.success("Organization deleted successfully");
        })
        .catch(function(error) {
            console.log('There is some error' + error);
        });
        
    }


    render() {
        let lang = this.props.match.params.lang || defaultLang().langUI ;
        return (
            <div className="container-fluid">
                <ToastContainer />
                <div className="row col-12"><div className="col-9"><h6>My Organizations</h6></div><div className="col-3"><NavLink to={setInRoute('add_organization',{lang:lang})}>Add Organization</NavLink></div></div>    
            	<div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Realm detail</th>
                                <th>Date</th>
                                <th>Name</th>
                                <th>Country</th>
                                <th>Type</th>
                                <th>Language</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.organization.map(member =>
                            <tr key={member._id}>
                            <td>{member.realm} </td>
                            <td>{member.date}</td>
                            <td>{member.name}</td>
                            <td>{member.country}</td>
                            <td>{member.type}</td>
                            <td>{member.language}</td>
                            <td><NavLink to={setInRoute('edit_organization',{lang:lang,_id:member._id})}>Edit</NavLink> | <a onClick={() => this.deleteOrganization(member)}>Delete</a></td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListOrganizationContentArea;