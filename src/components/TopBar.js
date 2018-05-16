import React from 'react';
import { NavLink } from 'react-router-dom';
import {versionInfo} from '../utils/versionhelper';
import {T} from '../utils/i18nhelper';
import { defaultLang, isAuthEnabled } from '../utils/generalhelper';
import LanguageSwitcher from '../containers/LanguageSwitcher';

import mobileButton from '../images/th-menu.png';
import NotifBar from './NotifBar';
import '../css/TopBar.css';
import 'font-awesome/css/font-awesome.css';

import { siteLogin, siteLogout, siteRegister, getUserInfo, getToken } from '../utils/GawatiAuthClient';

const Logo = () =>
    <NavLink className="nav-brand" to="/">
        <div className="logo-img"/>
    </NavLink>
    ;

const SiteHeading = () =>
    <div className="logotype">
        <h1>{ T("african law library")}</h1>
        <h2>{ T("innovative access to law") }</h2>
    </div>
    ;

const TopBarUpper = ({i18n, match}) => {
        return (
            <div className="col-12">
                <div style={ {"width":"50%:", "textAlign": "right", "marginRight":"40px", "paddingBottom":"10px"} }>
                <LanguageSwitcher i18n={i18n} match={match} />
                </div>
            </div>
        );
};
    ;


class TopBar extends React.Component {
    state = { username: 'guest', authenticated: 'false','organization_access': 'true'}
    handleChange = (e, { name, value }) => { this.setState({ [name]: value }); }

    toggleDropDown = ()=>{
	    document.getElementById("myDropdown").classList.toggle("show");
	}

    login = () => {
        siteLogin();
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

    componentDidMount() {
        //this.checkLogin();
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
                })
                .error( (err) => {
                    this.setState({username: "guest"});
                    console.log(" getUserName (err) = ", err);
                });
            }
        }
    }

    renderLoggedin =  (lang, userName) => {
        if (userName === "guest") {
            return (
            <div className="inline-elements">
                <div className="click" onClick={ this.login }>
                    {T("Sign in")} 
                </div>
                <span className="or">&nbsp;&nbsp;{T("or")}&nbsp;&nbsp;</span>
                <div className="click" onClick={ this.register}> 
                    {T("Sign up")}
                </div>
            </div> 
            );
        } else {
            return (
            <div className="dropdown">
                <div onClick={this.toggleDropDown} className="dropbtn">
                    <i className="fa fa-user-circle fa-2x" aria-hidden="true"></i>
                </div>
                <div id="myDropdown" className="dropdown-content">
                    <button className={ `btn btn-link loggedIn` }>
                        <NavLink to={ `/_lang/${lang}/profile` }>Logged in as <b>{userName}</b></NavLink>
                    </button>
                    <button className={ `btn btn-link` }  onClick={this.logout}>
                        Sign out
                    </button>
                </div>
            </div> 
            );   
        }
    };

    render() {
        let lang = this.props.match.params.lang || defaultLang().langUI ;
        const {username} = this.state ;
    	return (
            <header className="navigation-bar">
                <div className="version-info">{
                    T("version") + " = " + versionInfo().version
                }
                </div>
                <div>
                <TopBarUpper i18n={ this.props.i18n } match={ this.props.match } />
                </div>
                <div className="container-fluid">
                    <Logo />
                    <SiteHeading />
                    <div className="mobile-button" onClick={this.props.slideToggle}>
                        <img alt="menu" src={mobileButton}  />
                    </div>
                    <div className="search-form-container col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <div className="row right">
                        <NotifBar />
                        <div className="login col-3">
                            {
                            
                            this.renderLoggedin(lang, username)
                            }
                        </div>
                    </div>
                    </div>
                </div>
                <div className="w-nav-overlay" data-wf-ignore=""/>
            </header>
        
        );
    }
}

export default TopBar;
