import React from 'react';
import {NavLink} from 'react-router-dom';

import { defaultLang } from '../utils/generalhelper';
import {T} from '../utils/i18nhelper';

import imgFace from '../images/face.svg';
// import imgLinkedin from '../images/linkedin.svg';
import imgTwitter from '../images/twitter.svg';
import imgInstagram from '../images/instagram.svg';
import '../css/Footer.css';

const ContentLink = ({lang, page, children}) =>
    <NavLink to={ `/_lang/${lang}/content/_page/${page}` }>{children}</NavLink>;

function Footer({match, i18n}) {
    let lang = match.params.lang || defaultLang().langUI ;
    return (
    <footer>
        <div className="container-fluid">
            <div className="row">
                <div className="col-4">
                    <ul>
                        <li>
                            <ContentLink lang={lang} page="policies">{T("Policies")}</ContentLink>
                        </li>
                        <li>
                            <ContentLink lang={lang} page="privacy_policy">{T("Privacy Policy")}</ContentLink>
                        </li>
                        <li>
                            <ContentLink lang={lang} page="copyright">{T("Copyright")}</ContentLink>
                        </li>
                        <li>
                            <ContentLink lang={lang} page="terms_of_service">{T("Terms of Service")}</ContentLink>
                        </li>
                    </ul>
                </div>

                <div className="col-4">
                    <ul>
                        <li>
                            <ContentLink lang={lang} page="who_we_are">{T("Who We Are")}</ContentLink>
                        </li>
                        <li>
                            <ContentLink lang={lang} page="what_we_do">{T("What We Do")}</ContentLink>
                        </li>
                        <li>
                            <ContentLink lang={lang} page="faq">{T("FAQ")}</ContentLink>
                        </li>
                        <li>
                            <a href="https://www.gawati.org">{T("Blog")}</a>
                        </li>
                        <li>
                            <a href="/">{T("Contact Us")}</a>
                        </li>
                    </ul>
                </div>

                <div className="col-4">
                    <p>{T("Join over 14,000 people who receive weekly information")}</p>
                    <div className="w-form">
                        <form className="w-clearfix" data-name="Email Form 2" id="email-form-2"
                            name="email-form-2">
                            <input className="newsletter-form" data-name="Email" id="email" maxLength="256"
                                name="email" placeholder={T("Enter your email address")} required="required"
                                type="email"/>
                            <input className="submit-newsletter" data-wait="Please wait..." type="submit"
                                value=">"/>
                        </form>
                        <div className="form-done">
                            <div>{T("Thank you! Your submission has been received!")}</div>
                        </div>
                        <div className="form-fail">
                            <div>{T("Oops! Something went wrong while submitting the form")}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="social-icons">
            <div className="social-link-group">
                <a
                    className="social-icon-link"
                    href="https://www.facebook.com/AfricanInnovationFoundation/"
                    rel="noopener noreferrer"
                    target="_blank"
                    >
                    <img alt="facebook" src={imgFace} width="25"/>
                </a>
                <a
                    className="social-icon-link"
                    href="https://www.instagram.com/africaninnovation/"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    <img alt="instagram" src={imgInstagram} width="25"/>
                </a>
                <a
                    className="social-icon-link"
                    href="https://twitter.com/afrinnovfdn?lang=en"
                    rel="noopener noreferrer"
                    target="_blank"
                    >
                    <img alt="twitter" src={imgTwitter} width="25"/>
                </a>
                {/*<a className="social-icon-link" href="/">
                    <img alt="linkedin" src={imgLinkedin} width="25"/>
                </a>*/}
            </div>
            <h5>{T("The African Law Library")}</h5>
        </div>
    </footer>
    );
}

export default Footer;