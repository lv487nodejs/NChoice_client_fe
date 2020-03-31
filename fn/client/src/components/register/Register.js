import React, { useState } from 'react';
import './Register.css';
import { Form, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { REGISTER_ROUTE } from "../../configs/login-register-config";
import axios from "axios";
import { postUserError, postUserStarted, postUserSuccess, postUserLoginSuccess } from "../../actions";


import { useForm } from "react-hook-form";
import * as yup from "yup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";


const addDataToLocalStorage = (token) => {
    localStorage.setItem('accessToken', JSON.stringify(token.accessToken));
    localStorage.setItem('refreshToken', JSON.stringify(token.refreshToken));
}

const USER_DATA = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
}

const eye = <FontAwesomeIcon icon={faEye} />;

const SignupSchema = yup.object().shape({
    firstName: yup
        .string()
        .required("No first name provided.")
        .min(2, "First name is too short - should be 2 chars minimum."),
    lastName: yup
        .string()
        .required("No last name provided.")
        .min(2, "Last name is too short - should be 2 chars minimum."),
    email: yup
        .string()
        .required("Required")
        .matches(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/, "Email must be correct. Example: nick@mail.com"),
    password: yup
        .string()
        .required("No password provided")
        .min(8, "Password is too short - should be 8 chars minimum")
        .matches(/(?=.*[0-9])/, "Password must contain a number"),
    confirmPassword: yup
        .string()
        .required("No password provided.")
        .test('passwords-match', 'please, confirm your password', function (value) {
            return this.parent.password === value;
        }),
    agreeToTerms: yup
        .boolean()
        .label('Terms')
        .test(
            'is-true',
            'You must agree to terms to continue',
            value => value === true
        ),
});
const Register = (props) => {
    const [user, setUser] = useState(USER_DATA);
    const { postUserStarted, postUserSuccess, postUserError, userStatus, postUserLoginSuccess } = props;
    const { register, handleSubmit, errors } = useForm({
        validationSchema: SignupSchema
    });
    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };
    const toggleConfirmPasswordVisiblity = () => {
        setConfirmPasswordShown(confirmPasswordShown ? false : true);
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
            const { accessToken, refreshToken } = response.data;
            return { accessToken, refreshToken };
        }).then(json => {
            postUserLoginSuccess(json);
            addDataToLocalStorage(json);
        }).catch(e => {
            console.log(e);
            postUserError(e);
        });
    }

    const onSubmit = (event) => {
        postUser(user, REGISTER_ROUTE);
    };

    if (userStatus === 'loginReceived') {
        return (<Redirect to='/login' />)
    }

    return (
        userStatus === 'loading' ?
            <div>Loading...</div> : (
                <Form className="register" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Label className="lable">Register</Form.Label>
                    <Form.Group>
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="First name"
                        defaultValue="Mark"
                        name={'firstName'}
                        value={user.firstName}
                        onChange={handleChange}
                        ref={register}
                    />
                    {errors.firstName && <p className="errorMessage">{errors.firstName.message}</p>}
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Last name"
                        defaultValue="Otto"
                        name={'lastName'}
                        value={user.lastName}
                        onChange={handleChange}
                        ref={register}
                    />
                    {errors.lastName && <p className="errorMessage">{errors.lastName.message}</p>}
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name={'email'}
                            value={user.email}
                            onChange={handleChange}
                            ref={register}
                        />
                        {errors.email && <p className="errorMessage">{errors.email.message}</p>}
                        <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
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
                            {errors.password && <p className="errorMessage">{errors.password.message}</p>}
                        </Form.Group>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label> Confirm Password</Form.Label>
                        <Form.Group className="pass-wrapper">
                        <Form.Control type="password" placeholder="Password"
                            name={'confirmPassword'}
                            ref={register}
                            type={confirmPasswordShown ? "text" : "password"}
                        />
                        <i onClick={toggleConfirmPasswordVisiblity}>{eye}</i>
                        {errors.confirmPassword && <p className="errorMessage">{errors.confirmPassword.message}</p>}
                        </Form.Group>
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="I agree to terms"
                            name={'agreeToTerms'}
                            ref={register}
                        />
                    </Form.Group>

                    {errors.agreeToTerms && <p className="errorMessage">{errors.agreeToTerms.message}</p>}
                    <Form.Group >
                        <Button variant="dark" type="submit" block>
                            REGISTER
                        </Button>
                    </Form.Group>
                    <Form.Group className="link">
                        <Link to="/login" className="btn btn-link" >LOG IN</Link>
                    </Form.Group>
                </Form>
            )
    );
}

const mapDispatchToProps = { postUserStarted, postUserSuccess, postUserError, postUserLoginSuccess };

const mapStateToProps = ({ authReducer: { userStatus } }) => ({
    userStatus
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);


