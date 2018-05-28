import React from 'react';
import PropTypes from 'prop-types';
import { Col, FormGroup, Label, Input} from 'reactstrap';

export default class EditableLabel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        	isEditing: this.props.isEditing || false,
			text: this.props.text || "",
            label: this.props.label || "",
            data: this.props.data || {}
        };
        
        this._handleFocus = this._handleFocus.bind(this);
        this._handleChange = this._handleChange.bind(this);
    }
    
    _handleFocus() {
    	if(this.state.isEditing) {
        	if(typeof this.props.onFocusOut === 'function') {
        		this.props.onFocusOut(this.state.text, this.state.data);
            }
        }
        else {
        	if(typeof this.props.onFocus === 'function') {
	        	this.props.onFocus(this.state.text, this.state.data);
            }
        }
    
    	this.setState({
        	isEditing: !this.state.isEditing,
        });
    }
	
    _handleChange(event) {
    	this.setState({
        	text: event.target.value,
        });
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.text !== this.state.text) {
            this.setState({text: nextProps.text});
        }
    }

    render() {
    	if(this.state.isEditing) {
            if(this.state.label===""){
                return (
                    <FormGroup row className={this.props.formGroupClassName}>
                        <Col sm={12}>
                            <Input type="text" value={this.state.text} 
                            onChange={this._handleChange} onBlur={this._handleFocus} 
                            placeholder={this.props.inputPlaceHolder} autoFocus/>
                        </Col>        
                    </FormGroup>
                );
            }else{
                return (
                    <FormGroup row className={this.props.formGroupClassName}>
                        <Label for="label" sm={2}>{this.state.label}</Label>
                            <Col sm={10}>
                                <Input type="text" value={this.state.text} 
                                onChange={this._handleChange} onBlur={this._handleFocus} 
                                placeholder={this.props.inputPlaceHolder} autoFocus/>
                            </Col>
                    </FormGroup>
                );
            }
        }else{
            if(this.state.label===""){
                return(
                    <FormGroup row onClick={this._handleFocus} className={this.props.formGroupClassName}>
                        <Col sm={10}>
                            <Label for="label" >{this.state.text}</Label>
                        </Col>
                        <Col sm={2}>
                            <Label for="label">Edit</Label>
                        </Col>
                    </FormGroup>
                );
            }else{
                return(
                    <FormGroup row onClick={this._handleFocus} className={this.props.formGroupClassName} >
                        <Label for="label" sm={2}>{this.state.label}</Label>
                        <Col sm={8}>
                            <Label for="label" >{this.state.text}</Label>
                        </Col>
                        <Col sm={2}>
                            <Label for="label">Edit</Label>
                        </Col>
                    </FormGroup>
                );
            }
        }
    }
}

EditableLabel.propTypes = {
    text: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    isEditing: PropTypes.bool,
    data: PropTypes.object,

    formGroupClassName: PropTypes.string,
    labelClassName: PropTypes.string,
    labelFontSize: PropTypes.string,
    labelFontWeight: PropTypes.string,

    inputMaxLength: PropTypes.string,
    inputPlaceHolder: PropTypes.string,
    inputTabIndex: PropTypes.number,
    inputWidth: PropTypes.string,
    inputHeight: PropTypes.string,
    inputFontSize: PropTypes.string,
    inputFontWeight: PropTypes.string,
    inputClassName: PropTypes.string,
    inputBorderWidth: PropTypes.string,

    onFocus: PropTypes.func,
    onFocusOut: PropTypes.func
};