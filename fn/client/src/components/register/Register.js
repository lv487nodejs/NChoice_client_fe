import React, {useState} from 'react';
import './Register.css';
import { Form, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { postUser } from "../../actions";
import { connect } from "react-redux";


const USER_DATA = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
}

const Register = (props) => {
    const[user, setUser] = useState(USER_DATA);

    const handleChange = (event) => {
        event.persist();
        setUser(prevUser => ({ ...prevUser, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.postUser(user, ['users', 'register']);
    };

    const {status} = props;

    if (status === 'received') {
        return <Redirect to='/' />
    }

    return (
        status === 'loading' ?
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
        )
    );
}

const mapDispatchToProps = dispatch => ({
    postUser: (value) => dispatch(postUser(value)),
});

const mapStateToProps = state => {
    return {
        status: state.authReducer.userStatus
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);


