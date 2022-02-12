import React, { Component } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import UserService from '../../Service/UserService';
import { Navigate } from 'react-router-dom';

import './ForgetPassword.scss';

const userService = new UserService();

export class ForgetPassword extends Component {

    constructor(props){
        super(props);

        this.state = {
        email: '',
        emailError: false
        };
    }

    changeState = (event) => {
        this.setState({
        [event.target.name]: event.target.value
        })
    }

    validation = () => {
        let isError = false;
        const error = this.state;
        error.emailError = this.state.email === '' ? true : false;

        this.setState({
        ...error
        })

        isError = error.emailError
        return isError;
    }

    next = () => {
        let isValidated = this.validation();
        let data = {
        "email": this.state.email
        }
        if (!isValidated) {
            userService.ForgetPassword(data)
                .then((res) => {
                console.log(res.data);
                }).catch((err) => {
                console.log(err);
                })
        }
    }

    render(){
        return(
            <div className="forget-body">
                <div className ="forget-body__main">
                    <div className="forget-body__main__logo">
                        <p>Fundoo-Note</p>
                    </div>
                    <div><h1 className="forget-body__main__heading">Find your email </h1></div>
                    <div><h3  className="forget-body__main__title">Enter your phone number or recovery email</h3></div>
                    <div className="forget-body__main__container">
                    <TextField 
                    name='email'
                    error={this.state.emailError}
                    helperText={this.state.emailError ? "Email is required" : ''}
                    onChange={(event) => this.changeState(event)}
                    id="outlined-basic" 
                    fullWidth label="Email or phone" 
                    size="small" /></div>
                    <div className="forget-body__main__button">
                        <div >
                            <Button variant="contained" onClick={this.next}>Next</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ForgetPassword