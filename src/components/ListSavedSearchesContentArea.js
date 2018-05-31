import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import EditableLabel from '../commons/EditableLabel';
import { ToastContainer, toast } from 'react-toastify';
import {apiGetCall} from '../api';
import {setInRoute, convertObjectToEncodedString} from '../utils/routeshelper';
import {isAuthEnabled } from '../utils/generalhelper';
import { getUserInfo, getToken } from '../utils/GawatiAuthClient';

class ListSavedSearchesContentArea extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            saved_searches: [],
            userName:'',
            gawati_portal_ui:'',
            earlier_search: ''
        };

        this.searchNameFocus = this.searchNameFocus.bind(this);
        this.searchNameFocusOut = this.searchNameFocusOut.bind(this);
    }

    handleChange = (e, { name, value }) => { this.setState({ [name]: value }); }

    componentDidMount() {
        
        if (isAuthEnabled()) {
            if (getToken() != null) {
                getUserInfo()
                .success( (data) => {
                    this.setState({ userName: data.preferred_username});
                    let apiSearch = apiGetCall(
                        'list-saved-searches', {userName: data.preferred_username}
                    );
                    
                    axios.get(apiSearch, {
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

        let apiGawati = apiGetCall(
            'gawati',
            {}
        );
        axios.get(apiGawati)
            .then(response => {
                this.setState({gawati_portal_ui: response.data["gawati-portal-ui"].urlBase});
            })
            .catch(function(error) {
                console.log("error in getDocument()", error);
            });
 

    }

    deleteSearch(member){

        let data = {
            _id: member._id,
            userName: this.state.userName
        }

        let apiSearch = apiGetCall(
            'delete-saved-searches', {}
        );
        
        axios.delete(apiSearch, {data
        }) 
        .then(response => {
            let search = this.state.saved_searches;
            let index = search.indexOf(member);
            this.setState({
                saved_searches: this.state.saved_searches.filter((_, i) => i !== index)
            });
            toast.success("Saved search deleted successfully");
        })
        .catch(function(error) {
            console.log('There is some error' + error);
        });
        
    }

    searchNameFocus(text, data) {
        console.log('Focused with text: ' + text);
        this.setState({
            earlier_search: text
        });
    }

    searchNameFocusOut(text, data) {

        let apiSearch = apiGetCall(
            'update-saved-searches', {}
        );
        
        axios.put(apiSearch, {
            _id: data._id,
            searchName: text,
            userName: this.state.userName
        }) 
        .then(response => {
            if(response.data.error!==undefined){
                toast.error(response.data.data.message);
                let search = this.state.saved_searches;
                let index = search.indexOf(data);
                search[index].searchName = this.state.earlier_search;
                this.setState({
                    saved_searches: search
                });
            }else{
                toast.success("Saved search updated successfully");
            }
        })
        .catch(function(error) {
            console.log('There is some error' + error);
        });
    }

    getFilterRoute = (data) =>{
        data = JSON.parse(data);
        return this.state.gawati_portal_ui + setInRoute("filter", {
            from: data.from,
            to: data.to,
            count: data.count,
            lang: data.lang,
            q: convertObjectToEncodedString(data.query)
        });
    }


    render() {
        //let lang = this.props.match.params.lang || defaultLang().langUI;
        return (
            <div className="container-fluid">
            <ToastContainer />
                <div className="row col-12"><div className="col-9"><h6>My Searches</h6></div></div>    
            	<div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.saved_searches.map(member =>
                            <tr key={member._id}>
                            <td>
                                <EditableLabel text={member.searchName} label=""
                                    labelClassName='searchnameClass'
                                    inputClassName='searchnameClass'
                                    formGroupClassName = 'margin-bottom-none'
                                    inputWidth='200px'
                                    inputHeight='25px'
                                    inputMaxLength='1000'
                                    data = {member}
                                    onFocus={this.searchNameFocus}
                                    onFocusOut={this.searchNameFocusOut}
                                />
                            </td>
                            <td><NavLink to={this.getFilterRoute(member.data)} target="_blank"> Visit</NavLink> | <a onClick={() => this.deleteSearch(member)}>Delete</a></td>
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