import React, { useEffect, useState } from 'react';
import './Register.css';
import { Form, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { REGISTER_ROUTE } from "../../configs/login-register-config";
import axios from "axios";
import { setUserLogged, setUserLoading } from "../../actions";


import { useForm } from "react-hook-form";
import * as yup from "yup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../Loading-spinner";


const addDataToLocalStorage = (token) => {
    localStorage.setItem('accessToken', JSON.stringify(token.accessToken));
    localStorage.setItem('refreshToken', JSON.stringify(token.refreshToken));
    localStorage.setItem('userId', JSON.stringify(token.id))
}

const USER_DATA = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
}

const eye = <FontAwesomeIcon icon={faEye} />;
const firstNameRequiredMessage = "No first name provided";
const firstNameMinElementCount = 2;
const firstNameMinMessage = `First name is too short - should be ${firstNameMinElementCount} chars minimum`;
const lastNameRequiredMessage = "No last name provided";
const lastNameMinElementCount = 2;
const lastNameMinMessage = `Last name is too short - should be ${lastNameMinElementCount} chars minimum`;
const emailRegExp = new RegExp(/^([a-z0-9_-]+.)[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+).[a-z]{2,6}$/);
const emailRegExpMessage = "Email must be correct. Example: nick@mail.com";
const emailRequiredMessage = "Required";
const passwordRegExp = new RegExp(/(?=.*[0-9])/);
const passwordRegExpMessage = "Password must contain a number";
const passwordRequiredMessage = "No password provided";
const passwordMinElementCount = 8;
const passwordMinMessage = `Password is too short - should be ${passwordMinElementCount} chars minimum`;
const passwordConfirmMessage = 'Please, confirm your password';
const agreeToTermsMessage = 'You must agree to terms to continue';
const SignupSchema = yup.object().shape({
    firstName: yup
        .string()
        .required(firstNameRequiredMessage)
        .min(firstNameMinElementCount, firstNameMinMessage),
    lastName: yup
        .string()
        .required(lastNameRequiredMessage)
        .min(lastNameMinElementCount, lastNameMinMessage),
    email: yup
        .string()
        .required(emailRequiredMessage)
        .matches(emailRegExp, emailRegExpMessage),
    password: yup
        .string()
        .required(passwordRequiredMessage)
        .min(passwordMinElementCount, passwordMinMessage)
        .matches(passwordRegExp, passwordRegExpMessage),
    confirmPassword: yup
        .string()
        .required(passwordRequiredMessage)
        .test('passwords-match', passwordConfirmMessage, function (value) {
            return this.parent.password === value;
        }),
    agreeToTerms: yup
        .boolean()
        .label('Terms')
        .test(
            'is-true',
            agreeToTermsMessage,
            value => value === true
        ),
});
const Register = (props) => {
    const [user, setUser] = useState(USER_DATA);
    const { setUserLogged, setUserLoading, userLogged, userLoading } = props;
    const [errorMsg, setErrorMsg] = useState('');
    const { register, handleSubmit, errors } = useForm({
        validationSchema: SignupSchema
    });
    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

    useEffect(() => {
        setUserLogged(false)
    }, [setUserLogged])

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

    const postUser = async (value, route) => {
        try {
            setUserLoading();
            const response = await axios.post(route, value);
            setUserLogged(true);
            addDataToLocalStorage(response.data);
        } catch (error) {
            setUserLogged(false)
            const { msg } = error.response.data.errors[0]
            setErrorMsg(msg)
        }
    }
    const handleOnSubmit = (event) => {
        postUser(user, REGISTER_ROUTE);
    };

    if (userLoading) {
        return <LoadingSpinner />
    }

    if (userLogged) {
        return <Redirect to='/' />
    }

    return (
        <Form className="register" onSubmit={handleSubmit(handleOnSubmit)}>
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
                    type="text"
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
                </Form.Group>
            </Form.Group>
            {errors.password && <p className="errorMessage">{errors.password.message}</p>}
            <Form.Group controlId="formBasicPassword">
                <Form.Label> Confirm Password</Form.Label>
                <Form.Group className="pass-wrapper">
                    <Form.Control
                        placeholder="Password"
                        name={'confirmPassword'}
                        ref={register}
                        type={confirmPasswordShown ? "text" : "password"}
                    />
                    <i onClick={toggleConfirmPasswordVisiblity}>{eye}</i>
                </Form.Group>
                {errors.confirmPassword && <p className="errorMessage">{errors.confirmPassword.message}</p>}
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
                <span>{errorMsg}</span>
            </Form.Group>
            <Form.Group className="link">
                <Link to="/login" className="btn btn-link" >LOG IN</Link>
            </Form.Group>
        </Form>

    );
}

const mapDispatchToProps = { setUserLogged, setUserLoading };

const mapStateToProps = ({ authReducer: { userLogged, userLoading } }) => ({
    userLogged, userLoading
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);


