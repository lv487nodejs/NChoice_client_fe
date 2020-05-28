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
    const [validated, setValidated] = useState(false);

    const [passwordShown, setPasswordShown] = useState(false);
    const eyeClassName = passwordShown?'fa fa-eye':'fa fa-eye-slash';

    useEffect(() => {
        setUserLogged(false)
    }, [setUserLogged])

    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    };

    const handleChange = (event) => {
        event.persist();
        setUser(prevUser => ({ ...prevUser, [event.target.name]: event.target.value }));

        const form = event.currentTarget

        if (!form.checkValidity()) {  
            setValidated(true);
            return
        };
        
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
                validated={validated}
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
                        pattern=".{8,16}"
                        onChange={handleChange}
                        
                    />
                    <Form.Control.Feedback type="invalid">
                        Please type Your XXXXXXXXXX. This field is required
                    </Form.Control.Feedback>
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
                            pattern=".{8,16}"
                            title="min length 8 max 16 characters"
                        />
                        <i className={eyeClassName} onClick={togglePasswordVisiblity}></i>
                    </Form.Group>
                    
                    <Form.Control.Feedback type="invalid">
                    Please type Your Firstname. This field is required
                </Form.Control.Feedback>
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
