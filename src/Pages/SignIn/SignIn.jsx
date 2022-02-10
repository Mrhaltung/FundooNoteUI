import React, { Component } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import UserService from '../../Service/UserService';

import './SignIn.scss';

const userService = new UserService()

export class SignIn extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email:'',
            password:'',
            emailError:false,
            passwordError:false,
            type:"password"
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
        error.emailError = this.state.email === '' ? true : false;
        error.passwordError = this.state.password === '' ? true : false;

        this.setState({
            ...error
        })

        isError = error.emailError || error.passwordError
        return isError;
    }

    next = () => {
        let isValidated = this.validation();
        let data = {
            "email": this.state.email,
            "password": this.state.password
        }

        if (!isValidated) {
            userService.SignIn(data)
            .then((res) => {
                console.log(res);
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
        return (
            <div class="Login-body">
                <div class="Login-body__logo">
                    <p>Fundoo-Note</p>
                </div>
                <h1 class="Login-body__header">Sign in</h1>
                <span class="Login-body__text">Use your Fundoo account</span>
                <formfield>
                        <TextField 
                        fullWidth label="Email or phone" 
                        name='email'
                        variant="outlined"
                        error={this.state.emailError}
                        helperText={this.state.emailError ? "Email is required" : ''}
                        onchange={(event) => this.changeState(event)}
                        size="small"
                        margin="normal"/>
                    <p class="text1">Forgot email?</p>
                        <TextField 
                        fullWidth label="Enter Password" 
                        name='password'
                        variant="outlined"
                        error={this.state.passwordError}
                        helperText={this.state.passwordError ? "Password is required" : ''}
                        onchange={(event) => this.changeState(event)} 
                        size="small" 
                        margin="normal"/>
                    <div class="text2">
                        Not your computer? Use Guest mode to sign in privately.
                        <a href="">Learn more</a>
                    </div>
                    <div class="buttons">
                        <Button>Create account</Button>
                        <Button onClick={this.next} variant="contained">Next</Button>
                    </div>
                </formfield>
            </div>
        )
    }
}

export default SignIn