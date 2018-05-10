import React from 'react';
import axios from 'axios';

import {apiGetCall} from '../api';


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
            'organization', {}
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

    deleteMember(member){
        var data = {
            id: member.id
        }
        
    }


    render() {
        return (
            <div className="container-fluid">
            	<div>
                    <h2>My Organization</h2>
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
                            <td>{member.langauge}</td>
                            <td><a onClick={() => this.openModal(member)}>Edit</a>|<a onClick={() => this.deleteOrganization(member)}>Delete</a></td>
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