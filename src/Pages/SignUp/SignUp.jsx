import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Checkbox ,FormControlLabel } from '@mui/material';
import UserService from '../../Service/UserService';
import { Link, Navigate } from 'react-router-dom';

import './SignUp.scss';

const userService = new UserService();

export class SignUp extends Component {

    constructor(props) {
        super(props);

        this.state ={
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            confirm:'',
            firstNameError:false,
            lastNameError:false,
            emailError:false,
            passwordError:false,
            confirmError:false,
            type: "password"
        };
    }

    changeState = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    validation = () => {
        let isError = false;
        const error = this.state;
        error.firstNameError = this.state.firstName === '' ? true : false;
        error.lastNameError = this.state.lastName === '' ? true : false;
        error.emailError = this.state.email === '' ? true : false;
        error.passwordError = this.state.password === '' ? true : false;
        error.confirmError = this.state.confirm === '' ? true : false;

        this.setState({
            ...error
        })

        isError = error.firstNameError || error.lastNameError || error.emailError || error.passwordError || error.confirmError
        return isError;
    }

    next = () => {
        let isValidated = this.validation();
        let data = {
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "email": this.state.email,
            "password": this.state.password
        }
        if (!isValidated) {
            userService.SignUp(data)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    redirect: true
                })
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    showPassword = (event) => {
        event.target.checked ?
            this.setState({
                type: "text"
            }) : this.setState({
                type: "password"
            })
    }

    render() {
        if(this.state.redirect){
            return <Navigate to='/SignIn'/>
        }
        return ( 
            <div className="body">
                <div className="body__main">
                    <div className="body__main__logo">
                        <p>Fundoo-Note</p>
                    </div>
                    <div>
                        <p className="body__main__header">Create Your Fundoo-Note Account</p>
                    </div>
                    <div className="body__main__parent-name">
                        <div id='textbox'>
                        <TextField 
                        id="outlined-basic"
                        name='firstName'
                        size="small"
                        label="First name"
                        error={this.state.firstNameError}
                        helperText={this.state.firstNameError ? "First Name is required":''}
                        onChange={(event) => this.changeState(event)}
                        variant="outlined" />
                        </div>
                        <div id='textbox'><TextField 
                        id="outlined-basic" 
                        name='lastName'
                        size="small" 
                        label="Last name"
                        error={this.state.lastNameError}
                        helperText={this.state.lastNameError ? "Last Name is required" : ''}
                        onChange={(event) => this.changeState(event)} 
                        variant="outlined" /></div>
                    </div>
                    <br />
                    <div className="body__main__parent-name">
                    <TextField 
                            id="outlined-basic" 
                            label="Username" 
                            name='email'
                            helperText="You can use letter, numbers & periods" 
                            fullWidth 
                            size='small' 
                            variant="outlined"
                            error={this.state.emailError}
                            helperText={this.state.emailError ? "Email is required" : ''}
                            onChange={(event) => this.changeState(event)} />
                    </div>
                    <div className="email-option">Use my current email address instead </div>
                    <br />
                    <div className="body__main__parent-name">
                        <div id='textbox'>
                        <TextField 
                            type={this.state.type} 
                            id="outlined-basic" 
                            label="Password" 
                            name='password'
                            size='small' 
                            fullWidth 
                            variant="outlined"
                            error={this.state.passwordError}
                            helperText={this.state.passwordError ? "Password is required" : ''}
                            onChange={(event) => this.changeState(event)} />
                        </div>
                        <div id='textbox'>
                        <TextField 
                            type={this.state.type} 
                            id="outlined-basic" 
                            label="Confirm" 
                            name='confirm'
                            size='small' 
                            fullWidth 
                            variant="outlined"
                            error={this.state.confirmError}
                            helperText={this.state.confirmError ? "Confirm password is required" : ''}
                            onChange={(event) => this.changeState(event)} />
                        </div>
                    </div>
                    <div className="body__main__bellow">Use 8 or more characters with a mix of letters, numbers & symbols</div>
                    <div className="body__main__parent password">
                    <FormControlLabel control={<Checkbox onChange={this.showPassword} />} label="Show Password" />
                    </div>
                    <br />
                    <div className="body__main__parent button">
                        <Link className="email-option" to='/SignIn'>Sign in instead</Link>
                        <div className=""><Button variant="contained" onClick={this.next}>Next</Button></div>
                    </div>
                </div>
                <div className="body__image">
                    <div className="body__image__image-container">
                        <img src="https://ssl.gstatic.com/accounts/signup/glif/account.svg" alt="" />
                    </div>
                    <div className="body__image__image-discription">
                        One account. All of Fundoo working for you.
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp