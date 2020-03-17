import React, {useState} from 'react';
import './Login.css';
import { Form, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { postUser } from "../../actions";
import { connect } from "react-redux";

const USER_DATA = {
    email: '',
    password: ''
};


const Login = (props) => {
    const [user, setUser] = useState(USER_DATA);

    const handleChange = (event) => {
        event.persist();
        setUser( prevUser => ({ ...prevUser, [event.target.name]: event.target.value }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        props.postUser(user);
    };

    const {status} = props;

    if (status === 'received') {
        return <Redirect to='/' />
    }

    return (
        status === 'loading' ?
            <div>Loading...</div> : (
            <div className={'login'}>
        <Form onSubmit={handleSubmit} >
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
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

const mapDispatchToProps = dispatch => ({
    postUser: (value) => dispatch(postUser(value)),
});

const mapStateToProps = state => {
    return {
        status: state.authReducer.userStatus
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);

