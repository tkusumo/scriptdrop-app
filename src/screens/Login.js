import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import logo from '../assets/scriptdrop.png';

class Login extends Component {
    render() {
        return (
            <div>
                <img src={logo} alt='scriptdrop' />
                <LoginForm />
            </div>
        )
    }
}

export default Login;
