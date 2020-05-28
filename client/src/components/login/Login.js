import React, { useState, useEffect } from 'react';
import './Login.css';
import { Form, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login"

import { setUserLogged, setUserLoading, setCart } from "../../actions";
import LoadingSpinner from "../Loading-spinner";
import withStoreService from '../hoc';
import { setToLocalStorage } from '../../services/localStoreService';

const addDataToLocalStorage = (token) => {
    setToLocalStorage('userId', token.userId)
    setToLocalStorage('accessToken', token.accessToken)
    setToLocalStorage('refreshToken', token.refreshToken)
}

const USER_DATA = {
    email: '',
    password: ''
};

const Login = ({ storeService, setUserLogged, setUserLoading, userLogged, userLoading, setCart }) => {
    const [user, setUser] = useState(USER_DATA);
    const [errorMsg, setErrorMsg] = useState('');
    const [emailError, setEmailError] = useState(true);
    const [passwordError, setPasswordError] = useState(true);


    const [passwordShown, setPasswordShown] = useState(false);
    const eyeClassName = passwordShown?'fa fa-eye':'fa fa-eye-slash';

    const emailErrorMessage = emailError
    ? ''
    : 'Please enter correct email';
    const passwordErrorMessage = passwordError
    ? ''
    : 'Please enter correct password';
    useEffect(() => {
        setUserLogged(false)
    }, [setUserLogged])

    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    };

    const handleChange = (event) => {
        event.persist();
        setUser(prevUser => ({ ...prevUser, [event.target.name]: event.target.value }));
    };

    const postUser = async () => {
        try {
            setUserLoading();
            const response = await storeService.loginUser(user);
            if (!response) throw new Error('Wrong email or password, please try again.')
            const { accessToken, refreshToken, cart, userId } = response
            setUserLogged(true);
            addDataToLocalStorage({ accessToken, refreshToken, userId })
            setCart(cart)
        } catch (err) {
            setUserLogged(false)
            setErrorMsg(err.message)
        }
    }

    const handlePasswordChange = event => {
        event.preventDefault()
        if(event.target.value.length >= 8 && event.target.value.length <= 16){
            setPasswordError(true)
            return
        }
        else{
            setPasswordError(false)
            return
        }
    }

    const handleEmailChange = event => {
        event.preventDefault()
        if(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(event.target.value)){
            setEmailError(true)
            return
        }
        else{
            setEmailError(false)
            return
        }
    }

    const handleOnSubmit = event => {
        event.preventDefault()
        postUser();
    };

    if (userLoading) {
        return <LoadingSpinner />
    }

    if (userLogged) {
        return <Redirect to='/' />
    }

    const responseGoogle = async (res) => {
        const userFromApi = await storeService.oauthGoogle({access_token: res.accessToken})
        const { accessToken, refreshToken, cart, userId } = userFromApi
        setUserLogged(true);
        addDataToLocalStorage({ accessToken, refreshToken, userId })
        setCart(cart)
    }

    const responseFacebook = async (res) => {
        const userFromAPI = await storeService.oauthFacebook({access_token: res.accessToken})
        const { accessToken, refreshToken, cart, userId } = userFromAPI
        setUserLogged(true);
        addDataToLocalStorage({ accessToken, refreshToken, userId })
        setCart(cart)
    }

    return (
        <div className={'login'}>
            <Form
                noValidate
                onSubmit={handleOnSubmit}
            >
                <Form.Label className="lable">Log In</Form.Label>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter email"
                        name={'email'}
                        value={user.email}
                        onChange={handleChange}
                        onBlur={handleEmailChange}
                    />
                    <i className="text-danger position-static">{emailErrorMessage}</i>
                </Form.Group>

                <Form.Group controlId="formBasicPassword" >
                    <Form.Label>Password</Form.Label>
                    <Form.Group className="pass-wrapper">
                        <Form.Control
                            type={passwordShown ? "text" : "password"}
                            placeholder="Password"
                            name={'password'}
                            value={user.password}
                            onChange={handleChange}
                            onBlur={handlePasswordChange}
                            title="min length 8 max 16 characters"
                        />
                        <i className={eyeClassName} onClick={togglePasswordVisiblity}></i>
                    </Form.Group>
                    <i className="text-danger position-static">{passwordErrorMessage}</i>
                </Form.Group>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Remember me"
                    />
                <Form.Group >
                    <Button variant="dark" type="submit" block>
                        LOG IN
                        </Button>
                    <span className="errorMessage">{errorMsg}</span>
                </Form.Group>
                <Form.Group className="link">
                    <Link to="/register" className="btn btn-link" >REGISTER</Link>
                </Form.Group>
            </Form>
            <div className='login-wrapper'>
                <FacebookLogin
                    appId={'1189412381401260'}
                    textButton={'Facebook'}
                    fields={'name, email, picture'}
                    callback={responseFacebook}
                />
                <GoogleLogin
                    clientId = {'303875330429-u4510uka1kogr1k4lqcgpr1eree7p20r.apps.googleusercontent.com'}
                    buttonText={'Google'}
                    onSuccess={responseGoogle}
                    onFailure={undefined}
                />
            </div>
        </div>
    )
};


const mapDispatchToProps = { setUserLogged, setUserLoading, setCart };

const mapStateToProps = ({ authReducer: { userLogged, userLoading } }) => ({
    userLogged, userLoading
});

export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(Login));
