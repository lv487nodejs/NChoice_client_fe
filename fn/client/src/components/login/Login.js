import React, {useState} from 'react';
import './Login.css';
import { Form, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import {LOGIN_ROUTE} from "../../configs/login-register-config";
import axios from "axios";
import { postUserError, postUserStarted, postUserSuccess} from "../../actions";

const addDataToLocalStorage = (token) => {
    localStorage.setItem('user', JSON.stringify(token));
}

const USER_DATA = {
    email: '',
    password: '',
    accessToken:''
};

const Login = (props) => {
    const [user, setUser] = useState(USER_DATA);
    const {postUserStarted,postUserSuccess,postUserError, userStatus}  = props;

const accessToken = localStorage.getItem('accessToken')    
    const handleChange = (event) => {
        event.persist();
        setUser({ ...user,accessToken, [event.target.name]: event.target.value });
    };
    const postUser = (value, route) => {
        postUserStarted();
        axios({
            method: 'post',
            url: route,
            data: value
        }).then(response => {
            const { accessToken, refreshToken,user } = response.data;            
            return { accessToken, refreshToken,user };
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
        return <Redirect to='/userpage' />
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

