import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import {versionInfo} from '../utils/versionhelper';
import {T} from '../utils/i18nhelper';
import { Aux, defaultLang, isAuthEnabled } from '../utils/generalhelper';
import LanguageSwitcher from '../containers/LanguageSwitcher';
import {apiGetCall} from '../api.js';

import mobileButton from '../images/th-menu.png';
import NotifBar from './NotifBar';
import '../css/TopBar.css';
import 'font-awesome/css/font-awesome.css';
import { siteLogin, siteLogout, siteRegister, getUserInfo, getToken } from '../utils/GawatiAuthClient';

import themes from '../configs/themes.json';

const Logo = ({home_url}) =>
    <Aux>
        <NavLink className="nav-brand"  to={home_url} target="_blank">
            <div className="logo-img"/>
            <SiteHeading />
        </NavLink>
        {/* <h2>{ T("custom:innovative access to law") }</h2> */}
    </Aux>
    ;

const SiteHeading = () =>
    <div className="logotype">
        <h1>{ T("african law library")}</h1>
        <h2>{ T("custom:innovative access to law") }</h2>
    </div>
    ;

class TopBarUpper extends React.Component {

    state = { username: 'guest', authenticated: 'false', 'organization_access': 'true'}

    handleChange = (e, { name, value }) => { this.setState({ [name]: value }); };

    login = () => {
        siteLogin();
    };

    toggleDropDown = () => {
        document.getElementById("myDropdown").classList.toggle("show");
    };  

    logout = () => {
        siteLogout();
        // is the below neccessary
        let lang = this.props.match.params.lang || defaultLang().langUI ;
        this.props.history.push('/_lang/'+lang);
    };

    register = () => {
        siteRegister();
    };

    getParameterByName = (variable, url)=>{
       var query = window.location.href;
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] === variable){return pair[1];}
       }
       return(false);
    }

    updateState = (username) =>{
        //this.setState({ authenticated: authenticated});
        this.setState({ username: username});
    }


    componentDidMount = () => {
        if (isAuthEnabled()) {
            if (getToken() != null) {
                // using getToken() here because there is no clear isLoggedIn() APi in keycloak
                // calling getUserInfo() is an option which makes an Ajax request, and an error return
                // (ajax resposne 401 forbidden ) indicates a user who is not logged in. 
                // however, just checking if a token is set seems to provide the same outcome without the 
                // overhead of the ajax request, so using getToken() here. 
                getUserInfo()
                .success( (data) => {
                    console.log(" getUserName (data) = ", data);
                    this.setState({username: data.preferred_username});
                    let apiGawati = apiGetCall(
                        'gawati',
                        {}
                    );
                    axios.get(apiGawati)
                        .then(response => {
                            this.setState({profile: response.data["gawati-profiles-ui"].urlBase});
                        })
                        .catch(function(error) {
                            console.log("error in getDocument()", error);
                        });
                })
                .error( (err) => {
                    this.setState({username: "guest"});
                    console.log(" getUserName (err) = ", err);
                });
            }
        }

    };

    renderLoggedin =  () => {
        const userName = this.state.username;
        let lang = this.props.match.params.lang || defaultLang().langUI ;
        if (userName === "guest") {
            return (
                <Aux>
                    <div className="click" onClick={ this.login }>
                        {T("Sign in")} 
                    </div>
                    <div className="click" onClick={ this.register}> 
                        {T("Sign up")}
                    </div>
                </Aux>
            );
        } else {
            return (
                    <Aux>
                        <NavLink to={ `/_lang/${lang}/profile` }  className={ `btn btn-link loggedIn` }>Logged in as <b>{userName}</b></NavLink>
                        <button className={ `btn btn-link` }  onClick={this.logout}>
                            Sign out
                        </button>
                    </Aux>
            );   
        }
    };

    render () {
        return (
        <div className="lang-switcher-wrapper">
            <div onClick={this.toggleDropDown} className="dropbtn">
                <i className="fa fa-user-circle fa-2x" aria-hidden="true"></i>
            </div>
            <LanguageSwitcher i18n={this.props.i18n} match={this.props.match} />
            <div id="myDropdown" className="dropdown-content">
                {this.renderLoggedin()}
                <NotifBar/>
                <div className="version-info">{
                        T("version") + " = " + versionInfo().version
                    }
                </div>
            </div>
                
        </div>
        )
    };
};

const SearchBox = (obj) =>
    <div className={ `${obj.cName2}` }>
        <form className="search-form" data-name="Email Form" id="email-form" name="email-form">
            <div className="div-block w-clearfix">
            </div>
        </form>
    </div>
    ;

class TopBar extends React.Component {
    state = {home_url: ''}
    componentDidMount = () =>{

        let apiGawati = apiGetCall(
            'gawati',
            {}
        );
        axios.get(apiGawati)
            .then(response => {
                this.setState({home_url: response.data["gawati-portal-ui"].urlBase});
            })
            .catch(function(error) {
                console.log("error in getDocument()", error);
            });
    }
    render() {
        const theme = process.env.REACT_APP_THEME;
        let route = this.props.match.params.routeName;
        let routeClass = route === undefined ? "home" : "notHome";
        let {cName, cName2} = themes[theme][routeClass];
        const {home_url} = this.state ;
        return (
            <header className={`navigation-bar ${theme} ${routeClass}`}>
                <Logo home_url={home_url}/>
                <div className="container-fluid second-header-row">
                    
                    <SiteHeading />
                    <div className="mobile-button" onClick={this.props.slideToggle}>
                        <img alt="menu" src={mobileButton}  />
                    </div>
                    <div className={`search-form-container ${cName} `}>
                        <SearchBox lang={ this.props.match.params.lang } cName2={ cName2 }></SearchBox>
                    </div>
                </div>
                <TopBarUpper i18n={ this.props.i18n } match={ this.props.match } />
                <div className="w-nav-overlay" data-wf-ignore=""/>
            </header>
        
        );
    }
}

export default TopBar;
