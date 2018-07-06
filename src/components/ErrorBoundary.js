import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { T } from '../utils/i18nhelper';
import oops from '../images/oops.jpg';

const style = {
  width: '50%',
  height: '100%',
  overflow: 'hidden',
  alignItems: 'center',
  position: 'relative',
  margin: 10,
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  portalFENotRunning() {
    return (
      <div>
        <Card>
          <CardImg style={style} src={oops} />
          <CardBody>
            <CardTitle>{T("Portal-fe server is not running.Please start the portal-fe server")}</CardTitle>
          </CardBody>
        </Card>
      </div>
    );
  }

  docsNotPresent() {
    return (
      <div>
        <Card>
          <CardImg style={style} src={oops} />
          <CardBody>
            <CardTitle>{T("There are no documents in the database!Please load some documents.")}</CardTitle>
          </CardBody>
        </Card>
      </div>
    );
  }
  
  render() {
    if(this.state.error){
      if (this.state.error.toString() === "TypeError: Cannot read property 'token' of undefined") {
        return this.portalFENotRunning();
      }else if(this.state.error.toString() === "TypeError: Cannot read property 'map' of undefined"){
        return this.docsNotPresent();
      }
      else{
        console.log("error is "+ this.state.error.toString());
          return (
            <div>
              <Card>
                <CardImg style={style} src={oops} />
                <CardBody>
                  <CardTitle>{T("Sorry something went wrong")}</CardTitle>
                  <CardSubtitle>{T("Please bear with us!")}</CardSubtitle>
                </CardBody>
              </Card>
            </div>
          );
      }
    }
    return this.props.children;
  }  
}

export default ErrorBoundary
