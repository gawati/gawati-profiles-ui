import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';
import './polyfills';
/* import BrowserRouter from 'react-router-dom' */
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import './i18n';

import {apiUrl} from './api';
import { setupWithConfig, initSSORequired, refreshToken } from './utils/GawatiAuthClient';
import { REFRESH_TOKEN_VALIDITY, REFRESH_TOKEN_INTERVAL } from './constants';

//import './index.css';
import 'bootstrap/dist/css/bootstrap-reboot.css';
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap-overrides.css';
import './css/app-custom.css';
import './css/app-media.css';

import { isAuthEnabled } from './utils/generalhelper';

function appRender() {
    ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>,
        document.getElementById('root')
    );
};

function launchWithAuth ()  {
    setInterval(() => {
        refreshToken(REFRESH_TOKEN_VALIDITY)
        .catch(err => {
            console.log("The authentication session has expired. Please sign-in again.");
            //siteLogout();
            initSSO();
        });
        }, 
        REFRESH_TOKEN_INTERVAL
    );
    initSSO();            
};

function initSSO(){
    console.log(" calling InitSSO ");
    initSSORequired(
        // onSuccess callback
        (authenticated) => {
            console.log(" SSO Authenticated = ", authenticated);
            appRender();
        },
        // onError callback
        (error) => {
            //alert("There was an error while initializing login", error);
            console.log(" initializing login error ", error);
        }
    );
}

// in development mode we can chose to disable authentication integration
// for testing purposes in configs/dev.json
if (!isAuthEnabled()) {
    appRender();
} else {
    axios.get(apiUrl("keycloak"))
    .then( (response) => {
        try {
            const keycloakConfig = response.data;
            console.log("CALLING setupWithConfig ");
            const isSetup = setupWithConfig(keycloakConfig);
            if (isSetup) {
                console.log("CALLING launchWithAuth ");
                launchWithAuth();                
            } else {
                console.log("CALLING appRender, isSetup false ");
                console.log(" ERROR: Authentication could not be setup ");
                appRender();
            }
        } catch (err) {
            console.log("ERROR : Authentication server connect / integration failed: ", err);
            appRender();
        }
    })
    .catch( (error) => {
        console.log(" Unable to load authentication profile on startup ", error, " possibly url is wrong ? ", apiUrl("keycloak"));
        appRender();
    });


}

registerServiceWorker();
