import React, {useState} from 'react';
import './Login.css';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useForm from "./useForm";
import validate from './LoginFormValidationRules';
import { addUserToStore } from '../../actions'
import {connect} from 'react-redux'

const Login = ({addUserToStore}) => {
    const {form, setForm} = useState({firstName: null, lastName:null, email:null, password:null})
    const {
        values,
        errors,
        handleChange,
        //handleSubmit,
    } = useForm(login, validate);
    function login(token) {
        localStorage.setItem('token', JSON.stringify(token))
        console.log('No errors, submit callback called!');
    }

    const handleSubmit = (event, route, value) => {
        if (event) event.preventDefault();
        axios({
            method: 'post',
            url: `https://stark-headland-06017.herokuapp.com/auth/${route}`,
            data: value
        })
            .then(r => login(r.data))
            .catch((e) => console.log(e))
    };

    return (
        <div className={'login'}>
        <Form onSubmit={handleSubmit} noValidate>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name={'email'}
                    value={values.email}
                    onChange={handleChange}
                    className={`input ${errors.email && 'is-danger'}`}
                />
                {errors.email && (
                    <p className="help is-danger">{errors.email}</p>
                )}
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
                    value={values.password}
                    onChange={handleChange}
                    className={`input ${errors.password && 'is-danger'}`}
                />
                {errors.password && (
                    <p className="help is-danger">{errors.password}</p>
                )}
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

};

const mapDispatchToProps = dispatch => ({
    addUserToStore: (value) => dispatch(addUserToStore(value)),
});


export default connect(mapDispatchToProps)(Login);


//створити акшин і ред.сер для юзера
// логін з токеном. токерн  с торедж
// загнати дані юхерав в редакс (обвязати компонет коннектом)  12 з відео

