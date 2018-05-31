import React from 'react';
import { Switch, Route} from 'react-router-dom';
import {Aux, defaultLang, isAuthEnabled} from '../utils/generalhelper';

import {getRoute, setInRoute} from '../utils/routeshelper';
import { getToken, getRolesForClient} from '../utils/GawatiAuthClient';
import { Nav, NavLink } from 'reactstrap';

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
                    <Nav>
                        <NavLink href={setInRoute('profile',{lang:lang})}>My Profile</NavLink> 
                        {this.state.organization_access==='true' ?  <NavLink href={setInRoute('list_organization',{lang:lang})}>My Organizations</NavLink> :<div></div> }
                        <NavLink href={setInRoute('list_saved_searches',{lang:lang})}>My Searches</NavLink> 
                    </Nav>
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