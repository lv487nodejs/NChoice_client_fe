import React, {useState} from 'react';
import './Register.css';
import { Form, Button, Col, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';


const USER_DATA = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
}

const Register = () => {
    const[user, setUser] = useState(USER_DATA);

    const handleChange = (event) => {
        event.persist();
        setUser(prevUser => ({ ...prevUser, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        axios({
            method: 'post',
            url: 'https://stark-headland-06017.herokuapp.com/users',
            data: {
                firstName: user.lastName,
                lastName: user.lastName,
                email: user.email,
                password: user.password

            }
        }).then((r) => console.log(r)).catch((e) => console.log(e))//приймати респонс).then()
    };



    console.log(user);

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
                    <Form.Check type="checkbox" label="Check me out"/>
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Submit
                </Button>
                <Link to="/login" className="btn btn-link">Cancel</Link>
            </Form>
        );

}

export default Register;


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

