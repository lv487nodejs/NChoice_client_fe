import React, {useState, useEffect } from 'react';
import './Register.css';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { addUserToStore } from "../../actions";
import { connect } from "react-redux";




const USER_DATA = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
}

const Register = ({addUserToStore}) => {
    const[user, setUser] = useState(USER_DATA);
    const [userDataResponse, setUserDataResponse] = useState({});

    useEffect(() => {
        addUserToStore(userDataResponse)
    }, [userDataResponse]);

    const handleChange = (event) => {
        event.persist();
        setUser(prevUser => ({ ...prevUser, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        axios({
            method: 'post',
            url: 'https://stark-headland-06017.herokuapp.com/users/register',
            data: user
        })
            .then(r => {
                setUserDataResponse(r.data)
                console.log('USER REGISTERED')
            })
            .catch((e) => console.log(e))
    };

        return (
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
        );
}

const mapDispatchToProps = dispatch => ({
    addUserToStore: (value) => dispatch(addUserToStore(value)),
});


export default connect(null, mapDispatchToProps)(Register);



// export function authHeader() {
//     // return authorization header with jwt token
//     let user = JSON.parse(localStorage.getItem('user'));
//
//     if (user && user.token) {
//         return { 'Authorization': 'Bearer ' + user.token };
//     } else {
//         return {};
//     }
// }

//кожен запи в хедері має давати токен. аксіос має поле хедер.
// https://stark-headland-06017.herokuapp.com/auth/login