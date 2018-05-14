import React from 'react';
import '../css/DivRow.css';

class DivRow extends React.Component { //({children, altClasses}) {

    render () {
        return (
            <div className={ `row ${this.props.altClasses || ""}`} ref={this.props.setFlexDirection}>
            {this.props.children}
            </div>
        );
    }
}

export default DivRow;