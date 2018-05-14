import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import './App.css';
import { I18n /* , Trans */ } from 'react-i18next';
import Page from './components/Page';


class App extends Component {

  /**
   * See https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-development-environment-variables-in-env
   * for how to use .env files
   * 
   * @memberof App
   */ 
  componentDidMount() {
    if (process.env.NODE_ENV === 'development') {
      const path =  './css/themes/' + process.env.REACT_APP_THEME + '/vars.css';
      import(`${path}`);
    }
  }

  render() {
    //console.log("process.env", process.env);
    return (
      <I18n ns="translations">
      {
        (t, { i18n })=>(
          <Page i18n={i18n} />
        )
      }
      </I18n>  
    );
  }
}


/*
class App extends Component {
  render() {
    return (
      <Page>
        <TopBar />
        <ContentArea />
        <Footer />
      </Page>
    );
  }
}

*/

export default App;
