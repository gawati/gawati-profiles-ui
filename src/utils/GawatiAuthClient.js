import Keycloak from 'keycloak-js';
// removed axios depdency to factor this out into a separate package
//import axios from 'axios';

/**
 * Gets the GAWATI_AUTH window object, which is essentially a Keycloak object
 */
const getGawatiAuth = () => {
    return window.GAWATI_AUTH ; 
};

/**
 * Get the config information used to create the Keycloak object
 */
const getGawatiAuthConfig = () => {
    return window.GAWATI_AUTH_CONFIG;
};

/**
 * Sets up the KeyCloak object into the global window object
 * using the KeyCloak json document
 */
/*
export const setup = (keycloakURL) => {
  if (window.GAWATI_AUTH === undefined) {
    return axios.get(keycloakURL).then(response => {
        window.GAWATI_AUTH_CONFIG = response.data;
        window.GAWATI_AUTH = Keycloak(response.data);
    });
  } else {;
    return Promise.resolve(true);
  }
};
*/

/**
 * Expects a full keycloak config object for setting up a Keycloak object
 * @param {*} keycloakConfig 
 */
export const setupWithConfig = (keycloakConfig) => {
    if (window.GAWATI_AUTH === undefined) {
        try {
            window.GAWATI_AUTH_CONFIG = keycloakConfig;
            window.GAWATI_AUTH = Keycloak(keycloakConfig);
            return true;
        } catch (error) {
            console.log(" There was an error initializing the keycloak config ", keycloakConfig, " error: ", error);
            return false;
        }
    } else {;
        return false;
    }
};
 
  

/**
 * Initializes the login for the KeyCloak object using force-login
 * @param {*} onSuccess success callback
 * @param {*} onError  error callback
 */
export const initLoginRequired = (onSuccess, onError) => {
    getGawatiAuth().init(
        {onLoad: 'login-required'}
    ).success( (authenticated) => {
        if (authenticated) {
            onSuccess();
        }
    }).error( (err) => {
        onError(err);
    });
};

/**
 * Initializes the login for the KeyCloak object, using check-sso. If the user is already logged in, 
 * does a transparent pass-thru auth.
 * 
 * @param {*} onSuccess success callback
 * @param {*} onError  error callback
 */
export const initSSORequired = (onSuccess, onError) => {
    getGawatiAuth().init(
        {onLoad: 'check-sso'}
    ).success( (authenticated) => {
        // we just move on to onSuccess whether authenticated or not
        console.log("initSSORequired = ", authenticated);
        onSuccess(authenticated);
    }).error( (err) => {
        onError(err);
    });
};

/**
 * Returns the authorization token
 */
export const getToken = () => {
    return getGawatiAuth().token;
};

/**
 * Returns the parsed authorization token
 */
const getTokenParsed = () => {
    return getGawatiAuth().tokenParsed ; 
};

/**
 * Returns applicable roles for a client; Also returns global roles
 * @param {*} client name of client
 * @returns array of roles 
 */
export const getRolesForClient = (client) => {
    let roles = [];
    const token = getTokenParsed();
    if (token.resource_access) {
        if (token.resource_access[client]) {
            roles = token.resource_access[client].roles;
        }
    }
    if (token.realm_access) {
        roles = roles.concat(token.realm_access.roles);
    }
    return roles;
};

export const getRolesForCurrentClient = () => {
    const client = getCurrentClient();
    return getRolesForClient(client);
};

/**
 *  Returns the current active client / resource being setup
 */
export const getCurrentClient = () => {
    const authConfig = getGawatiAuthConfig();
    if (authConfig.clientId) {
        return authConfig.clientId;
    } else 
    if (authConfig.resource) {
        return authConfig.resource;
    } else {
        return "";
    }
};

/**
 * Generates the bearer token
 * @param {*} token 
 */
export const generateBearerToken = (token) => { 
    return {Authorization: `Bearer ${token}` , 'Content-Type': 'application/json' };
};

/**
 * Redirects to Login
 */
export const siteLogin = () => {
    return getGawatiAuth().login();
};

/**
 * Logs out
 */
export const siteLogout = () => {
    return getGawatiAuth().logout();
};

export const siteRegister = () => {
    return getGawatiAuth().register();
};


/**
 * Updates the Access Token using the Refresh Token, every
 * ``minValidity`` seconds.
 * @param {integer} minValidity in seconds
 */
export const refreshToken = (minValidity = 5) => {
    return new Promise((resolve, reject) => {
        getGawatiAuth().updateToken(minValidity)
            .success(() => resolve())
            .error((err) => reject(err));
    });
};

/**
 * Returns the full name of the current user
 * Returns a success(data) and error(error) promise
 */
export const getUserInfo = () => {
    return getGawatiAuth().loadUserInfo();
      /*
    .success((data) => { onSuccess(data.name) })
    .error((err) => console.log(err));
    */
};
  
    
  /**
   * Returns the profile of the current user
   * with a success(data) and error(error) promise
   */
  export const getUserProfile = (onSuccess) => {
    return getGawatiAuth().loadUserProfile();
    /*
    .success((data) => { onSuccess(data) })
    .error((err) => console.log(err));
    */
};