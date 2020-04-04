import React, { useState } from 'react';
import './Login.css';
import { Form, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { LOGIN_ROUTE } from "../../configs/login-register-config";
import axios from "axios";
import { postUserError, postUserStarted, postUserSuccess } from "../../actions";

import { useForm } from "react-hook-form";
import * as yup from "yup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

const addDataToLocalStorage = (token) => {
    localStorage.setItem('Token', JSON.stringify(token));
}

const USER_DATA = {
    email: '',
    password: ''
};
const emailRegExp =new RegExp(/^([a-z0-9_-]+.)[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+).[a-z]{2,6}$/);
const emailRegExpMessage = "Email must be correct. Example: nick@mail.com";
const emailRequiredMessage = "Required";
const passwordRegExp = new RegExp(/(?=.*[0-9])/);
const passwordRegExpMessage = "Password must contain a number";
const passwordRequiredMessage = "No password provided";
const passwordMinElementCount = 8;
const passwordMinMessage = `Password is too short - should be ${passwordMinElementCount} chars minimum`;

const SignupSchema = yup.object().shape({
    email: yup.string()
        .required(emailRequiredMessage)
        .matches(emailRegExp, emailRegExpMessage),

    password: yup.string()
        .required(passwordRequiredMessage)
        .min(passwordMinElementCount, passwordMinMessage)
        .matches(passwordRegExp,passwordRegExpMessage )
});
const Login = (props) => {
    const [user, setUser] = useState(USER_DATA);
    const { postUserStarted, postUserSuccess, postUserError, userStatus } = props;
    const { register, handleSubmit, errors } = useForm({
        validationSchema: SignupSchema
    });
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
      };

    const handleChange = (event) => {
        event.persist();
        setUser(prevUser => ({ ...prevUser, [event.target.name]: event.target.value }));
    };
    const postUser = (value, route) => {
        postUserStarted();
        axios({
            method: 'post',
            url: route,
            data: value
        }).then(response => {
            const { accessToken, refreshToken, userId } = response.data;
            return { accessToken, refreshToken, userId };
        }).then(json => {
            postUserSuccess(json);
            addDataToLocalStorage(json);
        }).catch(e => {
            postUserError();

        });
    }
    const onSubmit = () => {
        postUser(user, LOGIN_ROUTE);
    };

    if (userStatus === 'received') {
        return <Redirect to='/' />
    }

    return (
        userStatus === 'loading' ?
            <div>Loading...</div> : (
                <div className={'login'}>
                    <Form onSubmit={handleSubmit(onSubmit)} >
                        <Form.Label className="lable">Log In</Form.Label>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter email"
                                name={'email'}
                                value={user.email}
                                onChange={handleChange}
                                ref={register}
                            />
                            {errors.email && <p className="errorMessage">{errors.email.message}</p>}
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
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
                                ref={register}
                            />
                             <i onClick={togglePasswordVisiblity}>{eye}</i>
                            </Form.Group>
                            {errors.password && <p className="errorMessage">{errors.password.message}</p>}
                            
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
                        </Form.Group>
                        <Form.Group className="link">
                            <Link to="/register" className="btn btn-link" >REGISTER</Link>
                        </Form.Group>
                    </Form>
                </div>
            )
    )
};


const mapDispatchToProps = { postUserStarted, postUserSuccess, postUserError };

const mapStateToProps = ({ authReducer: { userStatus } }) => ({
    userStatus
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

