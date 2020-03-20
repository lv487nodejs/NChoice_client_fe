import React, {useState} from 'react';
import './Register.css';
import { Form, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import {REGISTER_ROUTE} from "../../configs/login-register-config";
import axios from "axios";
import {postUserError, postUserStarted, postUserSuccess} from "../../actions";


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

const Register = (props) => {
    const[user, setUser] = useState(USER_DATA);
    const {postUserStarted,postUserSuccess,postUserError, userStatus} = props;

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
                postUserSuccess(json);
                addDataToLocalStorage(json);
            }).catch(e => {
                postUserError();
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        postUser(user, REGISTER_ROUTE);
    };

    if (userStatus === 'received') {
        return (<Redirect to='/' />)
    }

    return (
        userStatus === 'loading' ?
            <div>Loading...</div> : (
            <Form className="register" onSubmit={handleSubmit}>
                <Form.Label>First name</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="First name"
                    defaultValue="Mark"
                    name={'firstName'}
                    value={user.firstName}
                    onChange={handleChange}
                />

                <Form.Label>Last name</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Last name"
                    defaultValue="Otto"
                    name={'lastName'}
                    value={user.lastName}
                    onChange={handleChange}
                />
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="Enter email"
                        name={'email'}
                        value={user.email}
                        onChange={handleChange}
                    />
                    <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        name={'password'}
                        value={user.password}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label> Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"/>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="I agree to terms"/>
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Submit
                </Button>
                <Link to="/login" className="btn btn-link">Return to Login</Link>
            </Form>
        )
    );
}

const mapDispatchToProps = {postUserStarted,postUserSuccess,postUserError};

const mapStateToProps = ({authReducer: {userStatus}}) => ({
    userStatus
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);


