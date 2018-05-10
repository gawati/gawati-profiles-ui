import React from 'react';
import { NavLink } from 'react-router-dom';
import {versionInfo} from '../utils/versionhelper';
import {T} from '../utils/i18nhelper';
import { defaultLang } from '../utils/generalhelper';
import LanguageSwitcher from '../containers/LanguageSwitcher';

import mobileButton from '../images/th-menu.png';
import NotifBar from './NotifBar';
import DivRow from './DivRow';
import '../css/TopBar.css';
import FontAwesome from 'react-fontawesome';
import 'font-awesome/css/font-awesome.css';

import GawatiAuthHelper from '../utils/GawatiAuthHelper';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

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
    login = () => {
        GawatiAuthHelper.login();
    }

    toggleDropDown = ()=>{
	    document.getElementById("myDropdown").classList.toggle("show");
	}

    logout = () => {
        GawatiAuthHelper.logout();
        let lang = this.props.match.params.lang || defaultLang().langUI ;
        this.props.history.push('/_lang/'+lang);
    }

    register = () => {
        GawatiAuthHelper.register();
    }

    getParameterByName = (variable, url)=>{
       var query = window.location.href;
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] === variable){return pair[1];}
       }
       return(false);
    }

    updateState = (authenticated, username) =>{
        this.setState({ authenticated: authenticated});
        this.setState({ username: username});
    }

    checkLogin = () =>{
        let isUserLoggedIn = cookies.get('KC_authenticated')==='true' ? 'true' : 'false';
        let username = cookies.get('KC_username');
        console.log(cookies.get('KC_realmAccess'));
        let resource = cookies.get('KC_resourceAccess');
        if(resource!==undefined){
            let realm = Object.keys(resource)[0];
            let role = resource[realm].roles;
            if(role.indexOf("portalui.Admin") != -1){  
               this.setState({organization_access:'true'});
            }
        }
        this.updateState(isUserLoggedIn, username);
    }
    componentDidMount() {
        this.checkLogin();
    }

    render() {
        let lang = this.props.match.params.lang || defaultLang().langUI ;
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
                    <DivRow>
                        <NotifBar />
                        <div className="login col-3">
                            {
                            this.state.authenticated==='true' ? 
                            <div className="dropdown">
                                <div onClick={this.toggleDropDown} className="dropbtn">
                                    <i className="fa fa-user-circle fa-2x" aria-hidden="true"></i>
                                </div>
                                <div id="myDropdown" className="dropdown-content">
                                    <button className={ `btn btn-link loggedIn` }>
                                        <NavLink to={ `/_lang/${lang}/profile` }>Logged in as <b>{this.state.username}</b></NavLink>
                                    </button>
                                    {
                                        this.state.organization_access==='true' ?
                                        <button className={ `btn btn-link loggedIn` }>
                                            <NavLink to={ `/_lang/${lang}/organization` }>Organization</NavLink>
                                        </button> : <div></div>
                                    }
                                    <button className={ `btn btn-link` }  onClick={this.logout}>
                                        Sign out
                                    </button>
                                </div>
                            </div> : 
                            <div className="inline-elements">
                                <div className="click" onClick={ this.login }>
                                    {T("Sign in")} 
                                </div>
                                <span className="or">&nbsp;&nbsp;{T("or")}&nbsp;&nbsp;</span>
                                <div className="click" onClick={ this.register}> 
                                    {T("Sign up")}
                                </div>
                            </div> 
                            }
                        </div>
                    </DivRow>
                    </div>
                </div>
                <div className="w-nav-overlay" data-wf-ignore=""/>
            </header>
        
        );
    }
}

export default TopBar;
