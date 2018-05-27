import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import {Aux, defaultLang, isAuthEnabled} from '../utils/generalhelper';

import {getRoute, setInRoute} from '../utils/routeshelper';
import { getToken, getRolesForClient} from '../utils/GawatiAuthClient';

import ProfileContentArea from './ProfileContentArea';
import ListOrganizationContentArea from './ListOrganizationContentArea';
import AddOrganizationContentArea from './AddOrganizationContentArea';
import EditOrganizationContentArea from './EditOrganizationContentArea';
import ListSavedSearchesContentArea from './ListSavedSearchesContentArea';


class HomeContentArea extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            organization_access: 'true'
        }        
    }

    componentDidMount(){
        if (isAuthEnabled()) {
            if (getToken() != null) {
                let roles = getRolesForClient();

                if(roles.indexOf("portalui.Admin") !== -1){  
                   this.setState({organization_access:'true'});
                }
            }
        }
        
    }

    render () {
        
        let lang = this.props.match.params.lang || defaultLang().langUI ;
        return (
            <Aux>
                <div className="row col-12">
                    <NavLink to={setInRoute('profile',{lang:lang})}>My Profile </NavLink>
                    {this.state.organization_access==='true' ? <NavLink to={setInRoute('list_organization',{lang:lang})}> &nbsp;| My Organizations</NavLink>:<div></div> }
                    <NavLink to={setInRoute('list_saved_searches',{lang:lang})}> &nbsp;| My Searches</NavLink>
                </div>
                <hr className="margin-top-none"></hr>
                <Switch>
                    <Route path={ getRoute('profile') } component={ProfileContentArea} />
                    <Route path={ getRoute('list_organization') } component={ListOrganizationContentArea} />
                    <Route path={ getRoute('add_organization') } component={AddOrganizationContentArea} />
                    <Route path={ getRoute('edit_organization') } component={EditOrganizationContentArea} />
                    <Route path={ getRoute('list_saved_searches') } component={ListSavedSearchesContentArea} />
                </Switch>
            </Aux>
        );
    }
    
}

export default HomeContentArea;