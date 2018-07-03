import React from 'react';
import { Switch } from 'react-router-dom';

import {Aux, defaultLang} from '../utils/generalhelper';
import {getRoute} from '../utils/routeshelper';

//import PageUpperBorder from './PageUpperBorder';
import TopBar from './TopBar';
import NoMatch from './NoMatch';
import HomeContentArea from './HomeContentArea';
import Footer from './Footer';
import { Redirect } from 'react-router'
import {PropsRoute} from '../utils/routeshelper';
import {Helmet} from "react-helmet";

class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
         this.slideToggle = this.slideToggle.bind(this);
         this.setCollapsible = this.setCollapsible.bind(this);
    }


    slideToggle() {
        if(this.state.open) {
            this.setState({open: false});
            this.element.style.width = '0px';
        }
        else {
            this.setState({open: true});
            this.element.style.width = '100%';
        }
    };

    setCollapsible = (el) => {
        if (el) {
            this.element = el;
            if(!this.state.open) {
                el.style.width = '0px';
            }
        }
    };

    render() {
        const prod = process.env.NODE_ENV === 'production';
        var css;
        if (prod) {
            css = <Helmet>
                    <link rel="stylesheet" type="text/css" href={`${process.env.PUBLIC_URL}/static/css/themes/${process.env.REACT_APP_THEME}/vars.css`} />
                    <link rel="stylesheet" type="text/css" href={`${process.env.PUBLIC_URL}/static/css/themes/${process.env.REACT_APP_THEME}/fonts.css`} />
                </Helmet>
        }
        return (
            <Aux>
                {css}
                <Switch>
                    <PropsRoute exact path="/_lang/:lang/:routeName/*" component={TopBar} i18n={this.props.i18n} slideToggle={this.slideToggle} />
                    <Redirect exact from="/" to={`/_lang/${this.props.i18n.language || defaultLang().langUI }/profile`} component={TopBar} i18n={this.props.i18n} slideToggle={this.slideToggle} />
                    <Redirect exact from="/index.html" to="/_lang/en/profile"component={TopBar} i18n={this.props.i18n} slideToggle={this.slideToggle} />
                    <PropsRoute path="/_lang/:lang/*" component={TopBar} i18n={this.props.i18n} slideToggle={this.slideToggle} />
                    <PropsRoute path="*" component={TopBar} i18n={this.props.i18n} slideToggle={this.slideToggle} />
                </Switch>
                <Switch>
                    <PropsRoute path={ getRoute('profile') } component={HomeContentArea} i18n={this.props.i18n} />
                    <PropsRoute path={ getRoute('list_organization') } component={HomeContentArea} i18n={this.props.i18n} />
                    <PropsRoute path={ getRoute('add_organization') } component={HomeContentArea} i18n={this.props.i18n} />
                    <PropsRoute path={ getRoute('edit_organization') } component={HomeContentArea} i18n={this.props.i18n} />
                    <PropsRoute path={ getRoute('list_saved_searches') } component={HomeContentArea} i18n={this.props.i18n} />
                    <PropsRoute component={NoMatch} />
                </Switch>
                <PropsRoute path="*" component={Footer}  i18n={this.props.i18n}  />
            </Aux>
        );
   } 
}


export default Page;