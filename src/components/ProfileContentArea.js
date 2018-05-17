import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import {setInRoute} from '../utils/routeshelper';
import { defaultLang, isAuthEnabled } from '../utils/generalhelper';

import EditableLabel from '../commons/EditableLabel';
import {apiGetCall} from '../api';
import { ToastContainer, toast } from 'react-toastify';
import { Col, FormGroup, Label, Input, FormText} from 'reactstrap';
import AvatarEditor from 'react-avatar-editor';

import { getToken, getRolesForClient, getUserProfile } from '../utils/GawatiAuthClient';

const ProfileContentInfo = ({label, value}) => {
    if(value!==undefined && value!==""){
        return (
            <FormGroup row>
                <Label for="label" sm={2}><b>{label}</b></Label>
                <Col sm={10}>
                    <Label for="label" >{value}</Label>
                </Col>
            </FormGroup>
        );
    }else{
        return (
            <FormGroup row>
            </FormGroup>
        );
    }
}

class ProfileContentArea extends React.Component {

    constructor(props) {
        super(props);
        this.nickNameFocus = this.nickNameFocus.bind(this);
        this.nickNameFocusOut = this.nickNameFocusOut.bind(this);
        this.phoneFocus = this.phoneFocus.bind(this);
        this.phoneFocusOut = this.phoneFocusOut.bind(this);
        this.countryFocus = this.countryFocus.bind(this);
        this.countryFocusOut = this.countryFocusOut.bind(this);
        this.languageFocus = this.languageFocus.bind(this);
        this.languageFocusOut = this.languageFocusOut.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
        this.state = {
            loading: true,
            organization_access: 'true',
            firstName:'',
            lastName:'',
            userName:'',
            nickName:'',
            dpUrl:'',
            email:'',
            phone:'',
            country:'',
            language:'',
        };
    }

    handleChange = (e, { name, value }) => { this.setState({ [name]: value }); }

    nickNameFocus(text) {
        console.log('Focused with text: ' + text);
    }
    phoneFocus(text) {
        console.log('Focused with text: ' + text);
    }
    countryFocus(text) {
        console.log('Focused with text: ' + text);
    }
    languageFocus(text) {
        console.log('Focused with text: ' + text);
    }

    imageFullUrl(name){
        let apiProfile = apiGetCall(
            'profile-image', {}
        );
        console.log(apiProfile+name);
        return apiProfile + '/' + name;
    }

    nickNameFocusOut(text) {

    	let apiProfile = apiGetCall(
            'profile', {}
        );

        axios.post(apiProfile, {
            nickName: text,
            userName: this.state.userName
        })
        .then(response => {
            console.log(response);
            if(response.data.success==="true"){
                toast("Nickname updated successfully");
            }else{
                toast("There is some problem. Kindly try again");
            }
        })
        .catch(function(error) {
            console.log('There is some error' + error);
            toast("There is some problem. Kindly try again");
        }); 
    }

    phoneFocusOut(text) {

        let apiProfile = apiGetCall(
            'profile', {}
        );

        axios.post(apiProfile, {
            phone: text,
            userName: this.state.userName
        })
        .then(response => {
            console.log(response);
            if(response.data.success==="true"){
                toast("Phone updated successfully");
            }else{
                toast("There is some problem. Kindly try again");
            }
        })
        .catch(function(error) {
            console.log('There is some error' + error);
            toast("There is some problem. Kindly try again");
        }); 
    }

    countryFocusOut(text) {

        let apiProfile = apiGetCall(
            'profile', {}
        );

        axios.post(apiProfile, {
            country: text,
            userName: this.state.userName
        })
        .then(response => {
            console.log(response);
            if(response.data.success==="true"){
                toast("Country updated successfully");
            }else{
                toast("There is some problem. Kindly try again");
            }
        })
        .catch(function(error) {
            console.log('There is some error' + error);
            toast("There is some problem. Kindly try again");
        }); 
    }

    languageFocusOut(text) {

        let apiProfile = apiGetCall(
            'profile', {}
        );

        axios.post(apiProfile, {
            language: text,
            userName: this.state.userName
        })
        .then(response => {
            console.log(response);
            if(response.data.success==="true"){
                toast("Language updated successfully");
            }else{
                toast("There is some problem. Kindly try again");
            }
        })
        .catch(function(error) {
            console.log('There is some error' + error);
            toast("There is some problem. Kindly try again");
        }); 
    }

    onImageChange(e){

    	let apiProfile = apiGetCall(
            'profile', {}
        );

        let file = e.target.files[0];
        let userName = this.state.userName;
        let formData = new FormData();
        formData.append('dpUrl',file);
        formData.set('userName',userName);

        axios({
            method: 'post',
            url: apiProfile,
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => {
            console.log(response);
            if(response.data.success==="true"){
                this.setState({dpUrl: this.imageFullUrl(response.data.data.dpUrl)});
                toast("Photo updated successfully");
            }else{
                toast("There is some problem. Kindly try again");
            }
        })
        .catch(function(error) {
            console.log(error);
            toast("There is some problem. Kindly try again");
        }); 
    }

    componentDidMount() {
        
    	let apiProfile = apiGetCall(
            'profile', {}
        );

        getUserProfile().success( (data) => {
            let firstName = data.firstName!==undefined ? data.firstName : '';
            let lastName = data.lastName!==undefined ? data.lastName : '';
            let email = data.email!==undefined ? data.email : '';
            let userName = data.username!==undefined ? data.username : '';
            this.setState({ userName: userName, firstName: firstName, lastName: lastName, email: email});
            axios.get(apiProfile, {
                params:{   
                    userName: userName
                }
            }) 
            .then(response => {
                this.setState({ nickName: response.data.data.nickName, phone: response.data.data.phone, country: response.data.data.country, language: response.data.data.language, dpUrl: this.imageFullUrl(response.data.data.dpUrl)});
            })
            .catch(function(error) {
                console.log('There is some error' + error);
            });
        })
        .error( (err) => {
            console.log(" getUserProfile (err) = ", err);
        });

        if (isAuthEnabled()) {
            if (getToken() != null) {
                let roles = getRolesForClient();

                if(roles.indexOf("portalui.Admin") !== -1){  
                   this.setState({organization_access:'true'});
                }
            }
        }

    }


    render() {
    	let lang = this.props.match.params.lang || defaultLang().langUI ;
        return (
            <div className="container-fluid">
            	<div className="row col-12"><h6>My Profile </h6>{ this.state.organization_access==='true' ?<NavLink to={setInRoute('list_organization',{lang:lang})}> | My Organizations</NavLink>:<div></div> }</div>
            	<ToastContainer />
                <div>
                    <FormGroup row>
                        <Label for="exampleFile" sm={2}><b>Profile Image</b></Label>
                        <Col sm={10}>
                            <AvatarEditor
                                image={this.state.dpUrl}
                                width={150}
                                height={150}
                                border={1}
                            />
                            <Input sm={10} type="file" name="file" id="imageFile" onChange={this.onImageChange}/>
                            <FormText color="muted">
                                Uppload new image to change the profile image.
                            </FormText>
                        </Col>
                    </FormGroup>
                    <ProfileContentInfo label="First Name" value={this.state.firstName}/>
                    <ProfileContentInfo label="Last Name" value={this.state.lastName} />
                    <ProfileContentInfo label="User Name" value={this.state.userName} />
                    <ProfileContentInfo label="Email" value={this.state.email} />
                    <EditableLabel text={this.state.nickName} label="Nick Name"
                        labelClassName='nicknameClass'
                        inputClassName='nicknameClass'
                        inputWidth='200px'
                        inputHeight='25px'
                        inputMaxLength='1000'
                        onFocus={this.nickNameFocus}
                        onFocusOut={this.nickNameFocusOut}
                    />
                    <EditableLabel text={this.state.phone} label="Telephone Number"
                        labelClassName='phoneClass'
                        inputClassName='phoneClass'
                        inputWidth='200px'
                        inputHeight='25px'
                        inputMaxLength='1000'
                        onFocus={this.phoneFocus}
                        onFocusOut={this.phoneFocusOut}
                    />
                    <EditableLabel text={this.state.country} label="Country"
                        labelClassName='countryClass'
                        inputClassName='countryClass'
                        inputWidth='200px'
                        inputHeight='25px'
                        inputMaxLength='1000'
                        onFocus={this.countryFocus}
                        onFocusOut={this.countryFocusOut}
                    />
                    <EditableLabel text={this.state.language} label="Language"
                        labelClassName='languageClass'
                        inputClassName='languageClass'
                        inputWidth='200px'
                        inputHeight='25px'
                        inputMaxLength='1000'
                        onFocus={this.languageFocus}
                        onFocusOut={this.languageFocusOut}
                    />
                </div>
            </div>
        );
    }
}

export default ProfileContentArea;