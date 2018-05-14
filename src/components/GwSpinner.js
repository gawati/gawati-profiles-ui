import React from 'react';
import Spinner from 'react-spinkit';

import '../css/GwSpinner.css';

const GwSpinner = () => 
    <div className="centered-spinner"><Spinner name="ball-spin-fade-loader" /></div>;

export default GwSpinner;