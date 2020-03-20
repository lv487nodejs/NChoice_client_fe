import React, {useState} from 'react';
import './Login.css';
import { Form, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import {LOGIN_ROUTE} from "../../configs/login-register-config";
import axios from "axios";
import { postUserError, postUserStarted, postUserSuccess, logoutUser } from "../../actions";

const addDataToLocalStorage = (token) => {
    localStorage.setItem('accessToken', JSON.stringify(token.accessToken));
    localStorage.setItem('refreshToken', JSON.stringify(token.refreshToken));
}

const USER_DATA = {
        email: '',
        password: ''
    };

const Login = (props) => {
    const [user, setUser] = useState(USER_DATA);
    const {postUserStarted,postUserSuccess,postUserError, userStatus, logoutUser}  = props;

    const handleChange = (event) => {
        event.persist();
        setUser( prevUser => ({ ...prevUser, [event.target.name]: event.target.value }));
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
        postUser(user, LOGIN_ROUTE);
    };

    if (userStatus === 'received') {
        return <Redirect to='/' />
    }

    return (
        userStatus === 'loading' ?
            <div>Loading...</div> : (
            <div className={'login'}>
        <Form onSubmit={handleSubmit} >
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

                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
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
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            <Link to="/register" className="btn btn-link">Register</Link>
        </Form>
        </div>
            )
    )
};


const mapDispatchToProps = {postUserStarted,postUserSuccess,postUserError};

const mapStateToProps = ({authReducer: {userStatus}}) => ({
    userStatus
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

