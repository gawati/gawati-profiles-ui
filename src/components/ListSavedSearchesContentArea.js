import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import {apiGetCall} from '../api';
import {setInRoute, convertObjectToEncodedString} from '../utils/routeshelper';
import {isAuthEnabled } from '../utils/generalhelper';
import { getUserInfo, getToken } from '../utils/GawatiAuthClient';

class ListSavedSearchesContentArea extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            saved_searches: []
        };
    }

    handleChange = (e, { name, value }) => { this.setState({ [name]: value }); }

    componentDidMount() {
        
        if (isAuthEnabled()) {
            if (getToken() != null) {
                getUserInfo()
                .success( (data) => {
                    
                    let apiOrganization = apiGetCall(
                        'list-saved-searches', {userName: data.preferred_username}
                    );
                    
                    axios.get(apiOrganization, {
                    }) 
                    .then(response => {
                        this.setState({ saved_searches: response.data.data});
                    })
                    .catch(function(error) {
                        console.log('There is some error' + error);
                    });
                })
                .error( (err) => {
                    console.log('There is some error' + err);
                });
            }
        } 

    }

    getFilterRoute = (data) =>{
        data = JSON.parse(data);
        return setInRoute("filter", {
            from: data.from,
            to: data.to,
            count: data.count,
            lang: data.lang,
            q: convertObjectToEncodedString(data.query)
        });
    }


    render() {
        return (
            <div className="container-fluid">
                <div className="row col-12"><div className="col-9"><h6>My Searches</h6></div></div>    
            	<div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Link</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.saved_searches.map(member =>
                            <tr key={member._id}>
                            <td>{member.searchName} </td>
                            <td><NavLink to={this.getFilterRoute(member.data)}> Visit</NavLink></td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListSavedSearchesContentArea;