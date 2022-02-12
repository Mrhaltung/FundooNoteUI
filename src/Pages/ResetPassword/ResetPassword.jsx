import React, { Component } from 'react'
import { TextField, FormControlLabel, Checkbox } from '@mui/material';
import Button from '@mui/material/Button';
import UserService from '../../Service/UserService';
import { Navigate } from 'react-router-dom';

import './ResetPassword.scss';

const userService = new UserService();

export class ResetPassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            password: '',
            confirm: '',
            passwordError: false,
            confirmError: false,
            type: "password"
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
        error.passwordError = this.state.password === '' ? true : false;
        error.confirmError = this.state.confirm === '' ? true : false;

        this.setState({
            ...error
        })

        isError = error.passwordError || error.confirmError
        return isError;
    }

    next = () => {
        let isValidated = this.validation();
        let data = {
        "password": this.state.password
        }

        if(!isValidated){
            userService.ResetPassword(data)
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
            }):this.setState({
                type: "password"
            })
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to="/SignIn" />
          }
        return(
            <div className="Reset-body">
                <div className="Reset-body__logo">
                    <p>Fundoo</p>
                    <h1 className='Reset-body__logo__PassHeader'>Reset Password</h1>
                    <span className='Reset-body__logo__text'>We'll never share your password with anyone else.</span>
                    <div className="Reset-body__logo__password">
                        <TextField 
                        fullWidth label="New Password" 
                        type={this.state.type}
                        name='password'
                        id="password"
                        error={this.state.passwordError}
                        helperText={this.state.passwordError ? "Password is required" : ''}
                        onChange={(event) => this.changeState(event)}
                        size="small" 
                        variant="outlined"/>
                    </div>
                    <div className="Reset-body__logo__password">
                        <TextField 
                        fullWidth label="Confirm Password"
                        name='confirm'
                        type={this.state.type}
                        id="password"
                        error={this.state.confirmError}
                        helperText={this.state.confirmError ? "Confirm password is required" : ''}
                        onChange={(event) => this.changeState(event)}
                        size="small"
                        variant="outlined"/>
                    </div>
                    <div className='checkbox'>
                      <FormControlLabel control={<Checkbox onChange={this.showPassword} />} label="Show Password" />
                    </div>
                    <div className="Reset-body__logo__button">
                        <Button onClick={this.next} variant="contained">Next</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ResetPassword
