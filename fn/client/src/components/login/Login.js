import React, { useState } from 'react';
import './Login.css';
import { Form, Button, Col } from 'react-bootstrap';
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

const SignupSchema = yup.object().shape({
    email: yup.string()
        // .email()
        .required("Required")
        .matches(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/, "Email must be correct. Example: nick@mail.com"),

    password: yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/(?=.*[0-9])/, "Password must contain a number.")
});
const Login = (props) => {
    const [user, setUser] = useState(USER_DATA);
    const { postUserStarted, postUserSuccess, postUserError, userStatus } = props;
    const { register, handleSubmit, errors } = useForm({
        validationSchema: SignupSchema
    });
    const [passwordShown, setPasswordShown] = useState(false);
    // const onSubmit = data => {
    //     alert(JSON.stringify(data));
    // };

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
            const { accessToken, refreshToken, user } = response.data;
            return { accessToken, refreshToken, user };
        }).then(json => {
            postUserSuccess(json);
            addDataToLocalStorage(json);
        }).catch(e => {
            postUserError();

        });
    }
    const onSubmit = (event, data) => {
        // event.preventDefault();
        // alert(JSON.stringify(data));
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
                                // required
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
                                // required
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
                        {/* <Form.Group controlId="formBasicCheckbox"> */}
                        {/* <Form.Check type="checkbox" label="Remember me" /> */}
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Remember me"
                        />
                        {/* </Form.Group> */}
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

