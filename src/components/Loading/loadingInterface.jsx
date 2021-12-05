import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import './loading.css';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';


export default function LoadingInterface() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };
    const userInfo = useSelector((state) => state.auth.profile);
    const userType = userInfo ? userInfo.user_type : null;


    return (
        <div className="loading-background">
            <div className="loading-interface">
                <h1><center>CNIC</center> </h1>
                <h2><center>登陆</center></h2>
                {userType ? <Redirect to='/main' /> : <LoginForm />}
            </div>
        </div>
    );
}