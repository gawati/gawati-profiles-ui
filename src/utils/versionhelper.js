import React from 'react';
import {Aux} from './generalhelper';
import version from '../../package.json';

/**
 * Provides access to the information in package.json
 */

/**
 * Gets Package.json
 */
export const versionInfo = () => version;

/**
 * Shows the version number in a component
 */
export const Version = () =>
<Aux>
    <div style={ {"float":"left","textAlign": "left", "minWidth":"100px", "marginLeft":"40px", "color": "red"} }>{
        "current version = " + versionInfo().version
    }
    </div>
    <div style={ {"width":"50%:", "textAlign": "right", "marginRight":"40px"} }>
        Some text
    </div>
</Aux>