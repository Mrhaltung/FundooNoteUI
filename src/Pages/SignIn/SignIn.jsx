import React, { Component } from 'react'
import { TextField, FormControlLabel, Checkbox } from '@mui/material';
import Button from '@mui/material/Button';
import UserService from '../../Service/UserService';
import { Link, Navigate } from 'react-router-dom';

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
        if (this.state.redirect) {
            return <Navigate to='/Home' />
        }
        return (
            <div className="Login-body">
                <div className="Login-body__logo">
                    <p>Fundoo-Note</p>
                </div>
                <h1 className="Login-body__header">Sign in</h1>
                <span className="Login-body__text">Use your Fundoo account</span>
                <div>
                        <TextField 
                        fullWidth label="Email or phone" 
                        name='email'
                        variant="outlined"
                        error={this.state.emailError}
                        helperText={this.state.emailError ? "Email is required" : ''}
                        onChange={(event) => this.changeState(event)}
                        size="small"
                        margin="normal"/>
                    <Link className="text1" to='/ForgetPassword'>Forgot email?</Link>
                        <TextField 
                        fullWidth label="Enter Password"
                        type={this.state.type} 
                        name='password'
                        variant="outlined"
                        error={this.state.passwordError}
                        helperText={this.state.passwordError ? "Password is required" : ''}
                        onChange={(event) => this.changeState(event)} 
                        size="small" 
                        margin="normal"/>
                        <div className='checkbox'>
                            <FormControlLabel control={<Checkbox onChange={this.showPassword} />} label="Show Password" />
                        </div>
                    <div className="text2">
                        Not your computer? Use Guest mode to sign in privately.
                        <a href="">Learn more</a>
                    </div>
                    <div className="buttons">
                        <Link to='/SignUp'>Create account</Link>
                        <Button onClick={this.next} variant="contained">Next</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignIn